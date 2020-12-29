import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

const validationRules = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim()
        .isLength({ min: 4, max: 22})
        .withMessage('Password must be between 4 and 22 characters')
];

router.post('/api/users/sign-up', validationRules, (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }

    res.send('OK');


});

export { router as signUpRouter };
