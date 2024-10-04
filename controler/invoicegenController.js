

const getInvoicedata = async(req,res,next) =>{

    console.log('get invoice');
    
    res.status(200).json('get invoice');
}

const newInvoicedata = async (req,res,next) =>{
    let singleitem = req.body;
    let userid=req.param.userid;
    // let singleitem1 = {
    //     id: id,
    //     desc: tabledet.desc,
    //     hsn: tabledet.hsn,
    //     quantity: tabledet.quantity,
    //     rateinctax: tabledet.rateinctax,
    //     rate: tabledet.rate,
    //     per: tabledet.per,
    //     disc: tabledet.disc,
    //     amount: tabledet.amount
    // };
    // let singlehsn = {
    //     id: id,
    //     hsndesc: singleitem.hsn,
    //     taxvalue: singleitem.amount,
    //     ctrate: 0,
    //     ctamount: 0,
    //     strate: 0,
    //     stamount: 0,
    //     amount: singleitem.amount
    // };

    res.status(200).json('added new invoice data');
}

const updateInvoicedata = async (req,res,next) =>{
    let singleitem = req.body;
    let userid=req.param.userid;
    res.status(200).json('invoice data update');
}

exports.getInvoicedata=getInvoicedata;

exports.newInvoicedata=newInvoicedata;
exports.updateInvoicedata=updateInvoicedata;