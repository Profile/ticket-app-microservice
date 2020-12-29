import { Router } from "express";

const router = Router();

router.get('/api/users/sign-up', (req, res) => {
    res.send('Hi!')
});

export { router as signUpRouter };
