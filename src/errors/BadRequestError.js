export default class BadRequestError extends CustomError{
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}