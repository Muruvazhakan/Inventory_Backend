const express = require("express");

const estimateCont = require("../controler/estimateController");

const router = express();

router.get('/:userid',estimateCont.getallestimate);

router.post('/createorupateestimate/:userid',estimateCont.createorupdateestimate);


module.exports=router;