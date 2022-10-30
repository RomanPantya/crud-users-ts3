import express from 'express';
import mongoose from 'mongoose';
import { postsRouter } from './routes/posts-router';
import { usersRouter } from './routes/users-router';

const app = express();
const port = 3000;

const mongoDB = 'mongodb://localhost:27017/smart_people';
mongoose.connect(mongoDB);

app.use(express.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
