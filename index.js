import express from 'express';
import mongoose from 'mongoose';
import todoRouter from './Routes/todos/index.js';
import bodyParser from 'body-parser';
import { DATABASEURL,PORT } from './config.js';
const app = express();

const url = DATABASEURL || "mongodb://localhost:27017/your-database-name";
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}

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

