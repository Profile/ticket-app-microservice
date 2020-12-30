import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode: number = 401;

    constructor() {
        super();
    }

    serializeErrors() {
        return [{ message: 'Not authorized' }];
    }
};
