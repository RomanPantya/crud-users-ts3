import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

const mongoDB = 'mongodb://localhost:27017/smart_people';
mongoose.connect(mongoDB);

app.use(express.json());

app.use('/users');
app.use('/posts');

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
