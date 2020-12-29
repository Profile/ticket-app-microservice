import { Router } from "express";

const router = Router();

router.get('/api/users/sign-out', (req, res) => {
    res.send('Hi!')
});

export { router as signOutRouter };
