const EstimateDetails = require('../Module/EstimateDetailModel');
const HttpError = require("../Module/httpError");

const getallestimate = async (req, res, next) => {
    let inputeuserid = req.params.userid;
    console.log(inputeuserid);
    console.log(req.params.toString());
    // let filteruserdata = estimate.filter((item) => {
    //     return item.userid === userid;
    // })
    let filteruserEstimation;
    try {
        filteruserEstimation = await EstimateDetails.find({ userid: inputeuserid });
    } catch (er) {
        throw new HttpError('error in search user', 400);
    }
    console.log(filteruserEstimation);
    if (filteruserEstimation.length === 0) {
        return res.status(401).json('No estimation for this user');
    }
    else {
        return res.status(200).json(filteruserEstimation);
    }

}

const createorupdateestimate = async (req, res, next) => {
    let allestimate = req.body;
    let userid = req.params.userid;
    let singleestimate = null;
    for (let i = 0; i < allestimate.length; i++) {
        singleestimate = allestimate[i];
        let estimate = null, isexistestimate, updatesexistestimate;
        // console.log(singleestimate);
        try {
            updatesexistestimate = await EstimateDetails.find({ estimateid: singleestimate.estimateid });

        } catch (er) {
            throw new HttpError('error in exist search', 400);
        }
        // console.log('updatesexistestimate');
        // console.log(updatesexistestimate);
        // console.log(updatesexistestimate.length);
        if (updatesexistestimate.length === 0) {
            try {
                estimate = new EstimateDetails({
                    clientAdd: singleestimate.clientAdd,
                    clientName: singleestimate.clientName,
                    clientPhno: singleestimate.clientPhno,
                    estimatedate: singleestimate.estimatedate,
                    estimatedate1: singleestimate.estimatedate1,
                    estimateid: singleestimate.estimateid,
                    grandtotalpvccost: singleestimate.grandtotalpvccost,
                    grandtotalupvccost: singleestimate.grandtotalupvccost,
                    grandtotalwoodcost: singleestimate.grandtotalwoodcost,
                    granttotalsqft: singleestimate.granttotalsqft,
                    userid: userid,
                    rows: singleestimate.rows,
                    columns: singleestimate.columns

                });
                // console.log('estimate');
                // console.log(estimate);
                await estimate.save({ upsert: true });
            } catch (er) {
                // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
                return res.status(400).json("error " + er);
            }

        }
        else {
            isexistestimate = updatesexistestimate[0];
            isexistestimate.clientAdd = singleestimate.clientAdd;
            isexistestimate.clientName = singleestimate.clientName;
            isexistestimate.clientPhno = singleestimate.clientPhno;
            isexistestimate.estimatedate = singleestimate.estimatedate;
            isexistestimate.estimatedate1 = singleestimate.estimatedate1;

            isexistestimate.grandtotalpvccost = singleestimate.grandtotalpvccost;
            isexistestimate.grandtotalupvccost = singleestimate.grandtotalupvccost;
            isexistestimate.grandtotalwoodcost = singleestimate.grandtotalwoodcost;
            isexistestimate.granttotalsqft = singleestimate.granttotalsqft;

            isexistestimate.rows = singleestimate.rows;
            isexistestimate.columns = singleestimate.columns;
            try {

                // console.log('before isexistestimate');
                // console.log(isexistestimate);
                await isexistestimate.save();
                //  await EstimateDetails.findByIdAndUpdate();
                // console.log(' after isexistestimate');
                // console.log(isexistestimate);
            } catch (er) {
                // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
                return res.status(400).json("error " + er);
            }

        }
    }
    return res.status(200).json('estimation saved');

}

exports.getallestimate = getallestimate;
exports.createorupdateestimate = createorupdateestimate;