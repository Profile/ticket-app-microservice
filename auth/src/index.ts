import "express-async-errors";
import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";
import { errorHandler } from "./middlewares/error-handler";

import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
    name: 'session',
    signed: false,
    secure: true,
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

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected MongoDB');
    } catch (e) {
        console.error(e);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
}

start();
