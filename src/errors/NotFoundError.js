export default class NotFoundErroe extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}