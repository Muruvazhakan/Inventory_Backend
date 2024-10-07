const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");
const schema = mongoose.Schema;

const estimateDetailSchema = new schema({
    columns: {type:Array, required: true}, 
    userid:{type:String, required: true}, 
    rows: {type:Array, required: true}, 
    granttotalsqft: {type:String},
    clientName: {type:String}, 
    clientPhno: {type:String}, 
    clientAdd: {type:String}, 
    estimateid: {type:String}, 
    estimatedate : {type:String}, 
    estimatedate1 : {type:String}, 
    grandtotalupvccost : {type:String},
     grandtotalpvccost: {type:String},
      grandtotalwoodcost: {type:String}
});

estimateDetailSchema.plugin(uniquevalidator);
module.exports = mongoose.model('EstimateDetails', estimateDetailSchema);