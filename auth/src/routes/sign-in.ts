import { Router } from "express";

const router = Router();

router.post('/api/users/sign-in', (req, res) => {
    res.send('Hi!')
});

export { router as signInRouter };
