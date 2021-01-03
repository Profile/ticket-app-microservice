import { validateRequest, BadRequestError } from "@mtickets/common";
import { Router, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { Password } from "../helpers/password";

const router = Router();

const validationSchema = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim()
        .notEmpty()
        .withMessage('Password is required')
];

const middlewares = [
    validationSchema,
    validateRequest
];

router.post('/api/users/sign-in', ...middlewares, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).lean();
    if(!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const isPasswordMatch = await Password.compare(password, existingUser.password);
    if(!isPasswordMatch) {
        throw new BadRequestError('Invalid credentials');
    }

    /** Generate web token. */
    const userJwt = jwt.sign({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    /** Store token on session object. */
    req.session = {
        jwt: userJwt
    };

    res.status(200).send({
        message: 'Success'
    });

});

export { router as signInRouter };
