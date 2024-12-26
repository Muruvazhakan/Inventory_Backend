const express = require("express");

const stockcont = require('../controler/StockController');

const router=express();

router.get('/getallstocks/:userid',stockcont.getAllStockdata);
router.post('/savestock/:userid',invoicecont.incremeantinvoiceid);
module.exports=router;