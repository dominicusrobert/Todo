const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

const UserRouter = require('./routers/UserRouter.js');
const TodoRouter = require('./routers/TodoRouter.js');


const app = express();
const db = mongoose.connection;


dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGOOSE_URL);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('CONNECT TO MONGOOSE');
});


app.use('/user', UserRouter);
app.use('/todo', TodoRouter);


app.listen(3000);