const express = require("express");

const estimateCont = require("../controler/estimateController");

const router = express();

router.get('/:userid',estimateCont.getallestimate);
router.post('/newestimate/:userid',estimateCont.getallestimate);
router.post('/updateestimate/:userid',estimateCont.getallestimate);

module.exports=router;