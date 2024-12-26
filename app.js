const { Storage } = require('@google-cloud/storage');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
const projectId = process.env.PROJECT_ID;
const secrectfolder = process.env.SECRECT_FOLDER;
// const keyFilename = process.env.KEYFILENAME;
const keyFilename = path.join('/etc/secrets', 'helpone-9bf33-64e48296ae59.json');
const storage = new Storage({ projectId, keyFilename
 });
 console.log("keyFilename");
 console.log(keyFilename);
const express = require('express');
const app=express();
const port = process.env.PORT || 4000;
const {mongoose} = require('mongoose');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const cors= require('cors');
const multer = require('multer');
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
const datas =process.env.MONGO_URI;
const bucket = storage.bucket(process.env.BUCKET_NAME);

const userRoure = require('./router/userRoute');
const userImageRoute = require('./controler/userController');
// const invoicegen = require('./router/invoicegenRoute');
const invoicegenRoute = require('./router/invoicegenRoute')
const estimategenRoute = require('./router/estimateRoute');
const stockRoute = require('./router/stockRoute');

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

  const multerMid = multer({
    storage: multer.memoryStorage(),
    // limits: {
    //   fileSize: 5 * 1024 * 1024,
    // },
  })
  // app.use(multerMid.single('file'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))

  app.post('/uploadCompanyLogo',upload.single("file"), async (req,res,next) =>{
  //console.log("app inside");
    console.log("intering123");
  // const body = req.body;
  // const userid = req.params.userid;
  // console.log(res);
  // console.log(userid);
  const myFile = req.file

  console.log(myFile);
  console.log("req.body.filename " + req.body.filename);
      try {
          // Get a reference to the specified bucket
          const bucket = storage.bucket(process.env.BUCKET_NAME);
          const storagepath = `AssetSync/CompanyLogo/${req.body.filename}`;

          const blob = bucket.file(storagepath);
          console.log("storagepath ");
          console.log(storagepath);
          const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            },
            resumable: false
        });
          // console.log("blobStream ");
          // console.log(blobStream);
          blobStream.on('error', err => {
            next(err);
            console.log(err);
            return;
        })
          blobStream.on('finish',() =>{
            res.status(200).send(storagepath);
          })
          blobStream.end(req.file.buffer);
          // Upload the specified file to the bucket with the given destination namE
          // const ret = await bucket.upload(file, { // ORG CODE WORKING
          //     destination: storagepath,

          // });
                    
      } catch (error) {
          // Handle any errors that occur during the upload process
          console.error('Error:', error);
      }

  
  });

app.use('/user/',userRoure);

app.use('/stock/',stockRoute);
app.use('/estimate/',estimategenRoute);

app.use((req,res,next) =>{
  res.status(400)
  res.json(("No data found"))
});

mongoose.connect(datas)
.then(() =>{
  app.listen(port, () =>{
    console.log(`AssetSync app listening on port ${port}`)
});
}).catch( err =>{
  console.log(err);
})
// app.listen(6000);