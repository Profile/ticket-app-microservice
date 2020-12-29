import { Router } from "express";

const router = Router();

router.post('/api/users/sign-out', (req, res) => {
    res.send('Hi!')
});

export { router as signOutRouter };
