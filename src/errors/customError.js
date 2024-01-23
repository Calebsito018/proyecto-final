export default class CustomError {
    static createError(message) {
        const error = new Error(message);
        return{
            message:error.message,
        }
    }
}