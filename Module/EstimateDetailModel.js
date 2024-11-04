const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");
const schema = mongoose.Schema;

const estimateDetailSchema = new schema({
    columns: { type: Array, required: true },
    userid: { type: String, required: true },
    rows: { type: Array, required: true },
    granttotalsqft: { type: String },
    clientName: { type: String },
    clientPhno: { type: String },
    clientAdd: { type: String },
    estimateid: { type: String },
    estimatedate: { type: String },
    estimatedate1: { type: String },
    grandtotalupvccost: { type: String },
    grandtotalpvccost: { type: String },
    grandtotalwoodcost: { type: String },
    discountedcheck: { type: String },
    discountedText: { type: String },
    discountedTotalupvccost: { type: String }, 
    discountedTotalpvccost: { type: String }, 
    discountedTotalwoodcost: { type: String }
});

const estimateDetailCounterSchema = new schema ({
    userid: { type: String, required: true },
    estimatedeatilcount:  { type: String, required: true },
    date : {type:Date}
})
estimateDetailSchema.plugin(uniquevalidator);
module.exports.EstimateDetails = mongoose.model('EstimateDetails', estimateDetailSchema);
module.exports.EstimateDeatailCounter = mongoose.model('EstimateDeatailCounter', estimateDetailCounterSchema);