export interface IErrorMessage {
  message: string;
  field?: string;

}

export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor() {
        super();

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): IErrorMessage[]
}
