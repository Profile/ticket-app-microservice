import { Router, Request, Response } from "express";
import {body, validationResult} from "express-validator";
import jwt from "jsonwebtoken";

import { RequestValidationError } from "../errors/request-validation-error";
import { IUserDocument, User } from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";

const router = Router();

const validationSchema = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim()
        .isLength({ min: 4, max: 22})
        .withMessage('Password must be between 4 and 22 characters')
];

router.post('/api/users/sign-up', validationSchema, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();

    const existingUser: Array<IUserDocument> = await User.findOne({ email: lowerCaseEmail }).lean();

    if(existingUser) {
        throw new BadRequestError('Email is use');
    }

    const user = User.build({ email: lowerCaseEmail, password });
    await user.save();

    /** Generate web token. */
    const userJwt = jwt.sign({
       id: user.id,
       email: user.email
    }, '1');

    /** Store token on session object. */
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user)

});

export { router as signUpRouter };
