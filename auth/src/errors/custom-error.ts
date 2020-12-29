export interface IErrorMessage {
  message: string;
  field?: string;

}

export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(param?: any) {
        super(param);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): IErrorMessage[]
}
