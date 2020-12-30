import { Router } from "express";

import { currentUser } from "../middlewares/current-user";

const router = Router();

router.get('/api/users/current-user', currentUser, (req, res) => {
    res.send({
        currentUser: req.currentUser || null
    })
});

export { router as currentUserRouter };
