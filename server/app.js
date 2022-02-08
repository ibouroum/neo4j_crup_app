const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const dotenv = require('dotenv');
var app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 3000

app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/', require('./route'));
app.listen(PORT);

console.log("Server started in port ",PORT);