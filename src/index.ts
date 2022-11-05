import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { authRouter } from './routes/auth-router';
import { postsRouter } from './routes/posts-router';
import { usersRouter } from './routes/users-router';

config();

const app = express();
const port = 3000;

async function main() {
    const mongoDB = 'mongodb://localhost:27017/smart_people';
    await mongoose.connect(mongoDB, {
        autoIndex: true, // make this also true
    });

    app.use(express.json());

    app.use('/users', usersRouter);
    app.use('/posts', postsRouter);
    app.use('/auth', authRouter);

    app.listen(port, () => {
        console.info(`server started at http://localhost:${port}`);
    });
}

main();
