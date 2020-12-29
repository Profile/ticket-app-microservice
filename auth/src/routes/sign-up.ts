import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = Router();

const validationSchema = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim()
        .isLength({ min: 4, max: 22})
        .withMessage('Password must be between 4 and 22 characters')
];

router.post('/api/users/sign-up', validationSchema, (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    throw new DatabaseConnectionError();

    res.send({
        status: 'OK'
    })


});

export { router as signUpRouter };
