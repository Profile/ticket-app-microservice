import { Router } from "express";

import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

const middlewares = [
    requireAuth,
    currentUser,
];

router.get('/api/users/current-user', ...middlewares, (req, res) => {
    res.send({
        currentUser: req.currentUser || null
    })
});

export { router as currentUserRouter };
