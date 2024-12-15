const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;

const storage = new Storage({ projectId, keyFilename
 });
// const storage = new Storage({ projectId, credentials:{
//   "type": "service_account",
//   "project_id": "helpone-9bf33",
//   "private_key_id": "64e48296ae591f7e9ed3e20e4979ff874423efad",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD0Ey4RW5L5Tl5x\nk6mgwUenCA0ss3uYboF+UVWbAIhIgUMKa3yr5NfM+befiEPkODImHljknzhNZ7Uy\nt6zE/3xfbmrnT3CanjjbtZSl1w8JdRaBoRpbVmrId7UlSaWizNiiq93wmkQ5FeyF\nOVzR79liySyILb9XOVsBmjQSeKNPVdPR4c6CShYYllyb22AiOuGDiHMR3t1RrJdB\nNt4ah+MH/v2M8BpJNKVd7Smeo6VduWpqudpaQSrWEfBHwqEqZOCv0b0+L2N2zjm9\nwgKo4Zm7LbqPUy0utb+kGq13/NnQTPs3YjLfY9VukOu8OwLcpIUjcKrxEH8nxxYq\n80gUr+cLAgMBAAECggEABRqz2PeuiHu6uDvx86NlAXM1wXUQYwFD0YwXbqeDoQyL\nykZcuER+vWMFAp/bRo116FvWUEa+aw2XaJpJwGGZKn/AfEChrx/5GBmUitBC/wJn\nOEHrfCe3RPoOT5c4EMrDcS//SHPQ7Cr3xkatZaCO56TOQ2AB0CeqNqmIJEA3SMZz\nkeP2YbwwuEWYhmMTZtnHEnqVBTGYd+8SBHbT8CFjPBcs2HkqHM1WaFyPgOJxqELd\n8jQeuMBn4CectwEZhFJXNTuEM3TLr+DT70WU0k1MgMnqA5qUj8rWMiIYJrelvjs6\nmogAcMnzJJrhfpj6SbdVtoeAfYVgztY9nisvpIsJvQKBgQD3fKE/0y3+ta3gHRor\nqNaYDZ6R8vp4UdXduWd4JlbCiLHti4J7JiIzMTELbVzpA1SDVRGnECpz2nXUbTm4\niFyc7CF/B07k1L1xBRM//YzK7Wbm2nfjCmjWvhozuaquPmpRVwIrcmTj4Il3gO5D\nurSsnp1AR5+SYjEoxyZO8zWaRwKBgQD8eIE2+H8FRn7RIuzgj0MENY5sgOHhR6zF\nCUL/nc/bN4fP0uE2ZQ2zKc7qOhoy2RKiqJzToulwgRAlDYSVddJ76q2dlc60ab9U\n1ATE/qbfoqhP6h2yokfE6SkMR5H1RpRNFu8JQHS2EPkFna2MCsPj2dQXdS9Qj77S\nomdasfCrHQKBgG7ePyJniXBUlUsT3nh2j4PYfhPl5Lzn9EX629ZgXneRYxwGZnKi\nt6l1PQJggMHGAyM+hcTwogP6dtSuBbCcLdkCk1LjxD0Q7LjnzCLbhCoYRgPfFNv5\n+tNQoE5Ru5uJTHmZ39f0zCulmA+YC6T9zBiUid+U9nBOWrVo2cl+fKHbAoGBAODZ\ndcL+Vyncmc8qeqqYDIhwJjLuKb2YNv+Yewnqg5bqAtONLTRjlWruHjCupGyKtTUW\nU+2MVrjyyO0m9+CgeWARJqSFKf21fEhRNxo27WmYlKvvhpl0O9TcDsm35/7459Us\nSqEDva30ucNNpaVmZQXFF0X5ALWP/9PZ/ZBhj0TlAoGAd/5GQpaMZS+aeM/EcJLn\n/IZpj6gD/YCNSIAtSZwxcvlvc9hByR+Lf35UGCKQynrPrze2OQJYhx3YIFLAGh8p\n8HqiHviLv6I0U0eTP9+Z5PylqoRex9kLrfNI29W0xJb6d42frNVcv/i61ylJ3yb2\nNmA4zG8OsO0by7VM8lFnwbo=\n-----END PRIVATE KEY-----\n",
//   "client_email": "helponestorageaccount@helpone-9bf33.iam.gserviceaccount.com",
//   "client_id": "117512498385392120559",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/helponestorageaccount%40helpone-9bf33.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }
//  });

const express = require('express');
const app=express();
const port = process.env.PORT || 4000;
const {mongoose} = require('mongoose');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const cors= require('cors');
const path = require("path");
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
          const storagepath = `BillEdge/CompanyLogo/${req.body.filename}`;

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

  //  app.post("/upload", upload.single("file"), async (req, res) => {
  //   if (!req.file) {
  //     return res.status(400).send("No file uploaded.");
  //   }
  
  //   const file = req.file;
  //   const fileName = `${Date.now()}-${file.originalname}`; // Use current timestamp to avoid name clashes
  //   const storagePath = `uploads/${fileName}`;  // This is the path inside your GCS bucket
    
  //   try {

  //     const blob = bucket.file(fileName);
  //     const blobStream = blob.createWriteStream();
  //     blobStream.on('finish',() =>{
  //       res.status(200).send("Sucsess");
  //     })
  //     blobStream.end(req.file.buffer);
  //     // Upload the file to Google Cloud Storage using bucket.upload()
  //     // const ret = await bucket.upload(file.buffer, {
  //     //   destination: storagePath,  // Set the destination path in your bucket
  //     //   metadata: {
  //     //     contentType: file.mimetype,
  //     //   },
  //     // });
  
  //     // Generate a public URL for the uploaded file
  //     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;
  
  //     // res.status(200).send({
  //     //   message: "File uploaded successfully!",
  //     //   fileUrl: publicUrl,  // Return the URL of the uploaded file
  //     // });
  //   } catch (err) {
  //     console.error("Error uploading file:", err);
  //     res.status(500).send("Error uploading file.");
  //   }
  // });

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