const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

const AuthRoutes = require('./api/routes/auth');

const taskRoutes = require('./api/routes/tasks');

const app = express();
app.use(morgan('dev'));
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['POST','PATCH','DELETE'],
    optionsSuccessStatus: 200
  };

app.options('/tasks/addTask', cors(corsOptions));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content_type, Accept, Authorization');
    next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Aniket4332:'+process.env.MONGO_PASS+'@basicapplication.9t9nm63.mongodb.net/?retryWrites=true&w=majority&appName=BasicApplication');

app.use('/auth',AuthRoutes);
app.use('/tasks',cors(corsOptions),taskRoutes);

module.exports = app;