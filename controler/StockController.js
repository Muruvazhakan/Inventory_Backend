const { AllStockDetailSchema, StockDetails, StockDeatailCounter, ClientDetailsSchema, SalestockDetailCounter, AllSalesStockDetailSchema, SaleStockDetailSchema } = require("../Module/StockDetailMode");
const HttpError = require("../Module/httpError");

const getAllStockdata = async (req, res, next) => {
    let inputuserid = req.params.userid;
    console.log('get getAllStockdata' + inputuserid);

    let stocklist;
    try {
        stocklist = await AllStockDetailSchema.find({ userid: inputuserid });
        if (stocklist.length !== 0) {
            return res.status(200).json(stocklist);
        }
        else {
            return res.status(204).json('No Stock are added');
        }
    } catch (er) {
        throw new HttpError('error in search user', 400);
    }
}

const getAllHistoryStockdata = async (req, res, next) => {
    let inputuserid = req.params.userid;
    console.log('get getAllStockdata' + inputuserid);

    let stockhistorylist;
    try {
        stockhistorylist = await StockDetails.find({ userid: inputuserid });
        if (stockhistorylist.length !== 0) {
            return res.status(200).json(stockhistorylist);
        }
        else {
            return res.status(204).json('No Stock are added');
        }
    } catch (er) {
        throw new HttpError('error in search user', 400);
    }
}

const getAllHistorySalesStockdata = async (req, res, next) => {
    let inputuserid = req.params.userid;
    console.log('get getAllHistorySalesStockdata' + inputuserid);

    let salesstockhistorylist;
    try {
        salesstockhistorylist = await SaleStockDetailSchema.find({ userid: inputuserid });
        if (salesstockhistorylist.length !== 0) {
            return res.status(200).json(salesstockhistorylist);
        }
        else {
            return res.status(204).json('No Sales Stock are added');
        }
    } catch (er) {
        throw new HttpError('error in search user', 400);
    }
}


const getAllClientdata = async (req, res, next) => {
    let inputuserid = req.params.userid;
    console.log('get getAllClientdata' + inputuserid);

    let stocklist;
    try {
        stocklist = await ClientDetailsSchema.find({ userid: inputuserid });
        if (stocklist.length !== 0) {
            console.log('getAllClientdata' + stocklist);
            return res.status(200).json(stocklist);
        }
        else {
            return res.status(204).json('No clients are added');
        }
    } catch (er) {
        throw new HttpError('error in search user', 400);
    }
}


const addOrUpdateStock = async (props, userid, type) => {
    let singlestock, stock = null, isexiststock, updatesexiststock;
    var datetime = new Date();
    // let dbServerr = (type =="add" ? AllStockDetailSchema : AllSalesStockDetailSchema);
    let dbServerr = AllStockDetailSchema;
    for (let i = 0; i < props.length; i++) {
        singlestock = props[i];
        // console.log('singlestock ....');
        // console.log(singlestock);
        try {
            updatesexiststock = await dbServerr.find({ userid: userid, productid: singlestock.productid });

        } catch (er) {
            return ("error in exist search");
        }
        // console.log('updatesexiststock');
        // console.log(updatesexiststock);
        // console.log(updatesexiststock.length);
        if (updatesexiststock.length === 0) {
            stock = new dbServerr({
                userid: userid,
                productid: singlestock.productid,
                quantity: singlestock.quantity,
                desc: singlestock.desc,
                rate: singlestock.rate,
                lastupdatedstockdate: datetime,
            });
            // console.log('stock');
            // console.log(stock);
            try {

                await stock.save({ upsert: true });
            } catch (er) {
                // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
                return ("error in new saving");
            }
        }
        else {
            isexiststock = updatesexiststock[0];
            //  console.log('isexiststock');
            //  console.log(isexiststock); 40/3
            let num = 1, avgrate = 0, preamt = 0, currentamt = 0, totamt = 0, totqyt = 0;
            console.log('isexiststock' + isexiststock);
            preamt = (isexiststock.rate * 1 * isexiststock.quantity * 1);
            currentamt = (singlestock.rate * 1 * singlestock.quantity * 1);
            //  console.log('singlestock' + singlestock );
            console.log(singlestock);
            console.log("type^^^^ " + type);
            console.log(' before avgrate' + avgrate);
            if (type == "add") {
                totamt = preamt + currentamt;
                totqyt = ((singlestock.quantity * 1) + (isexiststock.quantity * 1));
                if (totqyt != 0)
                    avgrate = ((totamt) / (totqyt)).toFixed(2);
                console.log('after avgrate' + avgrate);
                isexiststock.rate = avgrate;
            } else if (type == "sale") {
                totqyt = ((singlestock.quantity * -1) + (isexiststock.quantity * 1));
                totamt = preamt - currentamt;
            }
            isexiststock.quantity = totqyt;
            isexiststock.desc = singlestock.desc;
            isexiststock.lastupdatedstockdate = datetime;
            try {

                console.log('before isexiststock');
                console.log(isexiststock);
                await isexiststock.save();
                //  await invoiceDetails.findByIdAndUpdate();
                // console.log(' after isexistinvoice');
                // console.log(isexistinvoice);
            } catch (er) {
                // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
                return ("error in updating");
            }
        }
    }
    return ("updated");
}

const addOrUpdateClient = async (props, userid, clientid, type) => {
    let singleclient, client = null, isexistclient, updatesexistclient;
    var datetime = new Date();
    console.log('addOrUpdateClient  ....');
    console.log(props);

    singleclient = props;
    console.log('addOrUpdateClient  ....');
    console.log(singleclient);
    try {
        updatesexistclient = await ClientDetailsSchema.find({ userid: userid, clientid: clientid });

    } catch (er) {
        return ("error in exist search");
    }
    console.log('updatesexistclient');
    console.log(updatesexistclient);
    console.log(updatesexistclient.length);
    if (updatesexistclient.length === 0) {
        client = new ClientDetailsSchema({
            userid: userid,
            clientid: clientid,
            clientName: singleclient.clientName,
            clientPhno: singleclient.clientPhno,
            clientAdd: singleclient.clientAdd,
            lastupdatedclientdate: datetime,
        });
        // console.log('stock');
        // console.log(stock);
        try {

            await client.save({ upsert: true });
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return ("error in new saving client detail");
        }
    }
    else {
        isexistclient = updatesexistclient[0];
        isexistclient.clientName = singleclient.clientName;
        isexistclient.clientPhno = singleclient.clientPhno;
        isexistclient.clientAdd = singleclient.clientAdd;
        isexistclient.lastupdatedclientdate = datetime;

        try {

            // console.log('before isexistclient');
            // console.log(isexistclient);
            await isexistclient.save();
            //  await invoiceDetails.findByIdAndUpdate();
            // console.log(' after isexistinvoice');
            // console.log(isexistinvoice);
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return ("error in updating client detail");
        }
    }
    return ("updated");
}
const addOrUpdateStockdata = async (req, res, next) => {

    let stocklist = req.body.stock.stocklist;
    let clientid = req.body.stock.clientid;
    let stockidcount = req.body.stock.stockidcount;
    // console.log("req.body");
    // console.log(req.body);
    let stockupdate = false;
    // console.log("stocklist");
    // console.log(stocklist);
    // console.log(req.body.stock);
    let headertext = req.body.stock.authorization;
    if (headertext !== "stockrequest") {
        return res.status(400).json("Authorization restricted");
    }

    let userid = req.params.userid;
    let singlestock = req.body.stock;
    // console.log("allstock ");
    // console.log(singlestock);
    // singlestock = allstock;
    let stock = null, isexiststock, updatesexiststock,beforeisexistsalestock,existstock=false;
    
    let responClientUpdate = await addOrUpdateClient(req.body.stock, userid, clientid, "add")
    console.log('responClientUpdate');
    console.log(responClientUpdate);
    if (responClientUpdate != "updated")
        return res.status(400).json("error in " + responClientUpdate);

    // console.log('singlestock');
    // console.log(singlestock);
    try {
        updatesexiststock = await StockDetails.find({ userid: userid, stockid: singlestock.stockid });
    } catch (er) {
        throw new HttpError('error in exist search', 400);
    }
    console.log('updatesexiststock');
    console.log(updatesexiststock);
    console.log(updatesexiststock.length);
    var datetime = new Date();
    if (updatesexiststock.length === 0) {
        stock = new StockDetails({
            userid: userid,
            rows: singlestock.stocklist,
            totalamt: singlestock.totalamt,
            stockid: singlestock.stockid,
            clientid: singlestock.clientid,
            lastupdatedstockdate: datetime,
            stockdate: singlestock.stockdate
        });
        console.log('stock');
        console.log(stock);
        try {

            await stock.save({ upsert: true });
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return res.status(400).json("error in new saving" + er);
        }
        stockupdate = true;
    }
    else {

        isexiststock = updatesexiststock[0];
        beforeisexistsalestock = JSON.parse(JSON.stringify(isexiststock));;
        existstock = true;
        //  console.log('isexiststock');
        //  console.log(isexiststock); 
        isexiststock.rows = singlestock.stocklist,
            isexiststock.totalamt = singlestock.totalamt;
        isexiststock.clientid = singlestock.clientid;
        isexiststock.lastupdatedstockdate = datetime;
        isexiststock.stockdate = singlestock.stockdate;
        try {

            // console.log('before isexiststock');
            // console.log(isexiststock);
            await isexiststock.save();
            //  await invoiceDetails.findByIdAndUpdate();
            // console.log(' after isexistinvoice');
            // console.log(isexistinvoice);
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return res.status(400).json("error in updating" + er);
        }
        // stockupdate=true;
    }

    if (existstock) {
        let accumalatevalue = [];
        console.log("$$$$$$ beforeisexistsalestock ????? ");
        console.log(beforeisexistsalestock);
        let isexistsales = beforeisexistsalestock.rows;
        let compainedvalue = [...stocklist,...isexistsales];
        console.log("$$$$$$ isexistsales ????? ");
        console.log(isexistsales);

        let singllistofsales = compainedvalue.map(innerrows => {
            console.log("innerrows");
            console.log(innerrows);
            let found = false;
            if (accumalatevalue.length > 0) {
              for (let i = 0; i < accumalatevalue.length; i++) {
                if (accumalatevalue[i].productid === innerrows.productid) {
                  found = true;
                  accumalatevalue[i].quantity = (accumalatevalue[i].quantity * 1) - (innerrows.quantity * 1);
                  console.log(" found &&&");
                  console.log(accumalatevalue);
                }
              }
              if (!found) {
                accumalatevalue = [...accumalatevalue, innerrows];
                console.log("nt found &&&");
              }
            } else {
              accumalatevalue = [innerrows];
              console.log("else &&&");
            }
            console.log("accumalatevalue &&&");
            console.log(accumalatevalue);
            // return accumalatevalue;
          });
        console.log('accumalatevalue add stocks');
        console.log(accumalatevalue);
        let responUpdatesale = await addOrUpdateStock(accumalatevalue, userid, "add");
        console.log('responUpdate sale stocks');
        console.log(responUpdatesale);
        if (responUpdatesale != "updated")
            return res.status(400).json("error in " + responUpdatesale);
    } else {
        let responUpdate = await addOrUpdateStock(stocklist, userid, "add");
        console.log('%%%responUpdate sale stocks %%%%');
        console.log(responUpdate);
        if (responUpdate != "updated")
            return res.status(400).json("error in " + responUpdate);
    }
    if (stockupdate) {
        let results = await incremeantstockid(userid, stockidcount);
        //    console.log('results');
        //    console.log(results);
        if (results !== "updated")
            return res.status(400).json("error in " + results);
    }

    return res.status(200).json('stocks saved');

}

const addOrUpdateSaleStockdata = async (req, res, next) => {
    let salestocklist = req.body.salestock.salestocklist;
    let clientid = req.body.salestock.clientid;
    let salestockidcount = req.body.salestock.salestockidcount;

    console.log("req.body");
    console.log(req.body);
    let salestockupdate = false, existstock = false;
    console.log("salestocklist");
    console.log(salestocklist);
    console.log(req.body.salestock);
    let headertext = req.body.salestock.authorization;
    if (headertext !== "stockrequest") {
        return res.status(400).json("Authorization restricted");
    }

    let userid = req.params.userid;
    let singlesalestock = req.body.salestock;
    // console.log("allsalestock ");
    // console.log(singlesalestock);
    // singlesalestock = allsalestock;
    let salestock = null, isexistsalestock, updatesexistsalestock, beforeisexistsalestock;


    let responClientUpdate = await addOrUpdateClient(req.body.salestock, userid, clientid, "add")
    console.log('responClientUpdate');
    console.log(responClientUpdate);

    if (responClientUpdate != "updated")
        return res.status(400).json("error in " + responClientUpdate);

    console.log('singlesalestock');
    console.log(singlesalestock);
    try {
        updatesexistsalestock = await SaleStockDetailSchema.find({ userid: userid, salestockid: singlesalestock.salestockid });
    } catch (er) {
        throw new HttpError('error in exist search', 400);
    }
    console.log('updatesexistsalestock');
    console.log(updatesexistsalestock);
    console.log(updatesexistsalestock.length);

    var datetime = new Date();
    if (updatesexistsalestock.length === 0) {
        salestock = new SaleStockDetailSchema({
            userid: userid,
            rows: singlesalestock.salestocklist,
            totalsalesamt: singlesalestock.totalsalesamt,
            salestockid: singlesalestock.salestockid,
            clientid: singlesalestock.clientid,
            lastupdatedsalestockdate: datetime,
            salestockdate: singlesalestock.salestockdate
        });
        console.log('salestock');
        console.log(salestock);
        try {

            await salestock.save({ upsert: true });
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return res.status(400).json("error in new saving" + er);
        }
        // return res.status(200).json('sale salestocks saved');
        salestockupdate = true;
    }
    else {
        isexistsalestock = updatesexistsalestock[0];
        beforeisexistsalestock = JSON.parse(JSON.stringify(isexistsalestock));;
        existstock = true;
        console.log('isexistsalestock');
        console.log(isexistsalestock);
        isexistsalestock.rows = singlesalestock.salestocklist;
        isexistsalestock.totalsalesamt = singlesalestock.totalsalesamt;
        isexistsalestock.clientid = singlesalestock.clientid;
        isexistsalestock.lastupdatedsalestockdate = datetime;
        isexistsalestock.salestockdate = singlesalestock.salestockdate;
        try {

            console.log('before isexistsalestock');
            console.log(isexistsalestock);
            await isexistsalestock.save();

        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return res.status(400).json("error in updating" + er);
        }
        salestockupdate = true;
    }
    if (existstock) {
        let accumalatevalue = [];
        console.log("$$$$$$ beforeisexistsalestock ????? ");
        console.log(beforeisexistsalestock);
        let isexistsales = beforeisexistsalestock.rows;
        let compainedvalue = [...salestocklist,...isexistsales];
        console.log("$$$$$$ isexistsales ????? ");
        console.log(isexistsales);

        let singllistofsales = compainedvalue.map(innerrows => {
            console.log("innerrows");
            console.log(innerrows);
            let found = false;
            if (accumalatevalue.length > 0) {
              for (let i = 0; i < accumalatevalue.length; i++) {
                if (accumalatevalue[i].productid === innerrows.productid) {
                  found = true;
                  accumalatevalue[i].quantity = (accumalatevalue[i].quantity * 1) - (innerrows.quantity * 1);
                  console.log(" found &&&");
                  console.log(accumalatevalue);
                }
              }
              if (!found) {
                accumalatevalue = [...accumalatevalue, innerrows];
                console.log("nt found &&&");
              }
            } else {
              accumalatevalue = [innerrows];
              console.log("else &&&");
            }
            console.log("accumalatevalue &&&");
            console.log(accumalatevalue);
            // return accumalatevalue;
          });

        // for (let i = 0; i < salestocklist.length; i++) {
        //     let found = false;
        //     let currentexistsales;
        //     console.log("$$$$$$ salestocklist &&&&");
        //     console.log(salestocklist);

        //     for (let j = 0; j < isexistsales.length; j++) {
        //         console.log("isexistsales &&&&");
        //         console.log(isexistsales);
        //         if (salestocklist[i].productid == isexistsales[j].productid) {
        //             found = true;
        //             salestocklist[i].quantity = Math.abs((salestocklist[i].quantity * 1) - (isexistsales[j].quantity * 1));
        //             console.log("******salestocklist[i].quantity &&&&");
        //             console.log(salestocklist[i]);
        //         }
        //     }
        //     if (found)
        //         accumalatevalue = [...accumalatevalue, salestocklist[i]];
        //     else
        //         accumalatevalue = [...accumalatevalue, isexistsales[i]];
        // }
        // let responUpdateadd = await addOrUpdateStock(isexistsalestock.rows, userid, "add");
        console.log('accumalatevalue add stocks');
        console.log(accumalatevalue);
        let responUpdatesale = await addOrUpdateStock(accumalatevalue, userid, "sale");
        console.log('responUpdate sale stocks');
        console.log(responUpdatesale);
        if (responUpdatesale != "updated")
            return res.status(400).json("error in " + responUpdatesale);
    } else {
        let responUpdate = await addOrUpdateStock(salestocklist, userid, "sale");
        console.log('%%%responUpdate sale stocks %%%%');
        console.log(responUpdate);
        if (responUpdate != "updated")
            return res.status(400).json("error in " + responUpdate);
    }

    if (salestockupdate) {
        let results = await incremeantsalestockid(userid, salestockidcount);
        console.log('results');
        console.log(results);
        if (results !== "updated")
            return res.status(400).json("error in " + results);
    }

    return res.status(200).json('sale salestocks saved');
}

const getstockid = async (req, res, next) => {
    let inputuserid = req.params.userid;
    let headertext = req.body.headertext;
    let stockid;
    try {
        stockid = await StockDeatailCounter.find({ userid: inputuserid });

        if (stockid.length !== 0) {
            return res.status(200).json(stockid[0].stockdeatilcount);
        }
        else {
            return res.status(204).json('No stock count is registered');
        }
    } catch (er) {
        throw new HttpError('error in search user', 400);
    }


    // console.log('get invoice');
}
const getsalesstockid = async (req, res, next) => {
    let inputuserid = req.params.userid;
    let headertext = req.body.headertext;
    let salestockid;
    try {
        salestockid = await SalestockDetailCounter.find({ userid: inputuserid });

        if (salestockid.length !== 0) {
            return res.status(200).json(salestockid[0].salestockdeatilcount);
        }
        else {
            return res.status(204).json('No stock count is registered');
        }
    } catch (er) {
        throw new HttpError('error in search user', 400);
    }


    // console.log('get invoice');
}

const incremeantsalestockid = async (userid, salestockidcount) => {
    let inputeuserid = userid;
    let salestockidvalue, finalsave;
    try {
        salestockidvalue = await SalestockDetailCounter.find({ userid: inputeuserid });
    } catch (er) {
        return ("exist search");
    }
    console.log('salestockidvalue');
    console.log(salestockidvalue);
    var datetime = new Date();
    if (salestockidvalue.length > 0) {
        finalsave = salestockidvalue[0];
        finalsave.date = datetime;
        console.log('inside');
        finalsave.salestockdeatilcount = salestockidcount;
        console.log(finalsave);
        try {
            await finalsave.save({ upsert: true });
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return ("error in exist search");
        }
    }
    else {
        console.log('else');
        finalsave = new SalestockDetailCounter({
            userid: inputeuserid,
            salestockdeatilcount: salestockidcount,
            date: datetime,
        });
        try {

            await finalsave.save({ upsert: true });
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return ("error in exist search");
        }
    }
    return ("updated");
}
const incremeantstockid = async (userid, stockcount) => {
    let inputeuserid = userid;
    let stockidvalue, finalsave;
    try {
        stockidvalue = await StockDeatailCounter.find({ userid: inputeuserid });
    } catch (er) {
        return ("exist search");
    }
    console.log('stockidvalue');
    console.log(stockidvalue);
    var datetime = new Date();
    if (stockidvalue.length > 0) {
        finalsave = stockidvalue[0];

        console.log('inside');
        finalsave.stockdeatilcount = stockcount;
        finalsave.date = datetime
        console.log(finalsave);
        try {
            await finalsave.save({ upsert: true });
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return ("error in exist search");
        }
    }
    else {
        console.log('else');
        finalsave = new StockDeatailCounter({
            userid: inputeuserid,
            stockdeatilcount: stockcount,
            date: datetime
        });
        try {

            await finalsave.save({ upsert: true });
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return ("error in exist search");
        }
    }
    return ("updated");
}


exports.getAllStockdata = getAllStockdata;
exports.getAllHistoryStockdata = getAllHistoryStockdata;
exports.getAllHistorySalesStockdata = getAllHistorySalesStockdata;
exports.addOrUpdateStockdata = addOrUpdateStockdata;
exports.addOrUpdateSaleStockdata = addOrUpdateSaleStockdata;
exports.getstockid = getstockid;
exports.getAllClientdata = getAllClientdata;
exports.getsalesstockid = getsalesstockid;