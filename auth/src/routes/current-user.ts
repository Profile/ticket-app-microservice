import { Router } from "express";

const router = Router();

router.get('/api/users/current-user', (req, res) => {
    res.send('Hi!')
});

export { router as currentUserRouter };
