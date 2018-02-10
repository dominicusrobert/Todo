const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const UserRouter = require('./routers/UserRouter.js');
const TodoRouter = require('./routers/TodoRouter.js');


const app = express();


dotenv.config();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/user', UserRouter);
app.use('/todo', TodoRouter);


app.listen(3000);