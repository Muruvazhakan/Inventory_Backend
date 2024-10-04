const express = require("express");

const invoicecont = require('../controler/invoicegenController');


const router=express();

router.get('/',invoicecont.getInvoicedata);
router.post('/newinvoice/:userid',invoicecont.newInvoicedata);
router.post('/updateinvoice/:userid',invoicecont.updateInvoicedata);

module.exports=router;