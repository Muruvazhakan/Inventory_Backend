const express = require('express');
const bodyParser = require('body-parser');
const app=express();

const userRoure = require('./router/userRoute');
// const invoicegen = require('./router/invoicegenRoute');
// const invoicegenRoute = require('./router/invoicegenRoute')
const estimategenRoute = require('./router/estimateRoute');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/',(req,res,next) =>{
    console.log("app inside");
    res.status(200).json('got request');
  });

app.use('/user/',userRoure);

app.use('/invoice/',invoicegenRoute);
app.use('/estimate/',estimategenRoute);

app.listen(6000);