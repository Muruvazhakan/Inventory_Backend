const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");
const schema = mongoose.Schema;

const estimateDetailSchema = new schema({
    columns: {type:Array, required: true}, 
    userid:{type:String, required: true}, 
    rows: {type:Array, required: true}, 
    granttotalsqft: {type:String, required: true},
    clientName: {type:String, required: true}, 
    clientPhno: {type:String, required: true}, 
    clientAdd: {type:String, required: true}, 
    estimateid: {type:String, required: true}, 
    estimatedate : {type:String, required: true}, 
    estimatedate1 : {type:String, required: true}, 
    grandtotalupvccost : {type:String, required: true},
     grandtotalpvccost: {type:String, required: true},
      grandtotalwoodcost: {type:String, required: true}
});

estimateDetailSchema.plugin(uniquevalidator);
module.exports = mongoose.model('EstimateDetails', estimateDetailSchema);