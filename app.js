const express = require('express');
const app=express();
const port = process.env.PORT || 4000;
const {mongoose} = require('mongoose');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const cors= require('cors');

const datas =process.env.MONGO_URI;

const userRoure = require('./router/userRoute');
// const invoicegen = require('./router/invoicegenRoute');
const invoicegenRoute = require('./router/invoicegenRoute')
const estimategenRoute = require('./router/estimateRoute');

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    // console.log(req);
    next();
  });

  app.get('/',(req,res,next) =>{
   //console.log("app inside");
    res.status(200).json('got request');
  });

app.use('/user/',userRoure);

app.use('/invoice/',invoicegenRoute);
app.use('/estimate/',estimategenRoute);

app.use((req,res,next) =>{
  res.status(400)
  res.json(("No data found"))
});

mongoose.connect(datas)
.then(() =>{
  app.listen(port, () =>{
    console.log(`BillEdge app listening on port ${port}`)
});
}).catch( err =>{
  console.log(err);
})
// app.listen(6000);