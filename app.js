const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const connectDB = require('./db/connectDB');
const usersRouter = require('./controllers/users');
const notesRouter = require('./controllers/notes');
const loginRouter = require('./controllers/login');

mongoose.set('strictQuery', false);
connectDB();

app.get('/', (req, res) => {
  res.send('Express App init...');
});

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter)

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
