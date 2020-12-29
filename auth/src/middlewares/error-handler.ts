import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res.status(400).send({
        msg: 'Oops! Something went wrong'
    })
}
