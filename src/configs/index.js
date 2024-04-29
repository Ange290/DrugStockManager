
const configure ={
    MONGODB_CONNECTION:process.env.MONGODB_CONNECTION || "mongodb+srv://uange209:7C4b8mIELMXYEEzb@cluster0.9wloecn.mongodb.net/DrugStockManager",
    PORT:process.env.PORT || 6000,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN:process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_COOKIE_NAME:process.env.JWT_REFRESH_COOKIE_NAME
}
export default configure;