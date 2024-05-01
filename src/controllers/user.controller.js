import userModel from "../models/user.model";
import asyncWrapper from "../middlewares/async.js";
import bcryptjs from 'bcryptjs';
import {BadRequestError} from '../errors/index.js';
import { validationResult } from "express-validator";
import {sendEmail} from "../utils/otp.js";
import {otpGenerator} from "../utils/otp.js";
import{UnauthorizedError} from "../errors/UnauthorizedError.js";
import jwt from 'jsonwebtoken';


export const SignUp = asyncWrapper(async(req,res,next) =>{
    //Validation
    const errors = validationResult(res);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    //checking if the user is already in using email
    const founderUser = await userModel.findOne({email:req.body.email});
    if(founderUser){
        return next(new BadRequestError("Email already exist"));
    };

    //Harshing the user password
    const hashedPassword = await  bcryptjs.hashSync(req.body.password,10);

    //Generate OTP
    const otp = otpGenerator();
    const otpExpirationDate = new Date().getTime() +(60 * 1000 *5);

    //Recording the user to the database
    const newUser = new userModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashedPassword,
        otpExpires:otpExpirationDate
    });

    const savedUser = await newUser.save();
    // console.log(savedUser);

    await sendEmail(req.body.email,"Verfy your account", `Your OTP is ${otp}` );
    if(savedUser){
        return res.status(201).json({
            message:"UserAccount Created",
            user:savedUser
        });
    }
});

export const ValidateOtp = asyncWrapper(async(req,res,next) =>{
    //validate
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next (new BadRequestError(errors.array()[0].msg));
    }

    //checking if the given otp is stored in our database
    const founderUser = await userModel.findOne({otp:req.body.otp});
    if(!founderUser){
        next (new UnauthorizedError('Authorization Denied'));
    };

    //checking if the otp is expired or not
    if(founderUser.otpExpires < new Date().getTime()){
      next(new UnauthorizedError('OTP Expired'));
    }

//Updating the user to verified
founderUser.verified = true;
const savedUser = await founderUser.save();
if(savedUser){
    return res.status(201).json({
        message:"User Account Verified",
        user:savedUser
    });
}

});
export const SignIn = asyncWrapper(async(req,res,next)=>{
    //validate
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next (new BadRequestError(errors.array()[0].msg));
    }

    //Find user
    const founderUser = await userModel.findOne({email: req.body.email});
    if(!founderUser){
        return next(new BadRequestError("Invalid email or password"));
    }
    //check account verification
    if(!founderUser.verified){
return next(BadRequestError("Your Account is nor Verified!"));
    }

    //Verify password
    const isPasswordVerfied = await bcryptjs.compareSync(req.body.password,founderUser);
    if(!isPasswordVerfied){
        return next (new BadRequestError("Invalid email or password"));
    }
    //Generate Token
    const token = jwt.sign({id: founderUser.id, email:founderUser.email}, process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(200).json({
        message:"User logged in!",
        token:token,
        user:founderUser
    });
});
