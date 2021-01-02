import { errorHandler, NotFoundError } from "@mtickets/common";
import "express-async-errors";
import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
    name: 'session',
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);


app.use("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
