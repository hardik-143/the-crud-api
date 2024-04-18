import express from 'express';
import mongoose from 'mongoose';
import todoRouter from './Routes/todos/index.js';
import bodyParser from 'body-parser';
import {DATABASEURL,PORT} from './config.js';
import { rateLimit } from "express-rate-limit";
const app = express();

const url = DATABASEURL || "mongodb://localhost:27017/tododb";
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

// limit incoming request from same IP
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // start blocking after 100 requests
});
app.use(limiter); //  apply to all requests


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/todos', todoRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Todo App');
});

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});

