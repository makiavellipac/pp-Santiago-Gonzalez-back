require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
const cors=require('cors')

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));

const app=express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.use(cors({credentials:true,origin:[process.env.FRONTENDPOINT]}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));


const index=require('./routes/index');
app.use('/',index);

app.listen(process.env.PORT,()=>{
    console.log(`listen on http://localhost:${process.env.PORT}`)
})
