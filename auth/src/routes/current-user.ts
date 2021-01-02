import { currentUser } from "@mtickets/common";
import { Router } from "express";

const router = Router();

const middlewares = [
    currentUser,
];

router.get('/api/users/current-user', ...middlewares, (req, res) => {
    res.send({
        currentUser: req.currentUser || null
    })
});

export { router as currentUserRouter };
