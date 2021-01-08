import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
    try {
        await mongoose.connect('mongodb://tickets-mongo-srv', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected MongoDB');
    } catch (e) {
        console.error(e);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!');
    });
}

if(!process.env.JWT_KEY) {
    throw Error('JWT_KEY must be defined');
}

start();
