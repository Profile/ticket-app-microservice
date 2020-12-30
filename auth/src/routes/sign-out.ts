import { Router } from "express";

const router = Router();

router.post('/api/users/sign-out', (req, res) => {
    req.session = null;
    res.send({});
});

export { router as signOutRouter };
