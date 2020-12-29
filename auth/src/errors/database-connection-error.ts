
export class DatabaseConnectionError extends Error {
    message = 'Error connecting to database';

    constructor() {
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}
