const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");
const schema = mongoose.Schema;

const stockDetailSchema = new schema({
    columns: { type: Array, required: true },
    userid: { type: String, required: true },
    rows: { type: Array, required: true },
    clientName: { type: String },
    clientPhno: { type: String },
    clientAdd: { type: String },
    id: { type: String },
    stockdate: { type: String },
});

const allStockDetailSchema = new schema({
    id: { type: String },
    desc: { type: String },
    quantity: { type: Number },
    rate: { type: Number },
    userid: { type: String, required: true },
    lastupdatedstockdate: { type: String },
});

const saleStockDetailSchema = new schema({
    productid: { type: String },
    productdetail: { type: Array, required: true },
    totalamount: { type: Number },
    userid: { type: String, required: true },
    clientName: { type: String },
    clientPhno: { type: String },
    clientAdd: { type: String },
    lastupdatedstockdate: { type: String },
});

const stockDetailCounterSchema = new schema ({
    userid: { type: String, required: true },
    stockdeatilcount:  { type: String, required: true },
    date : {type:Date}
})
stockDetailSchema.plugin(uniquevalidator);
module.exports.StockDetails = mongoose.model('StockDetails', stockDetailSchema);
module.exports.StockDeatailCounter = mongoose.model('StockDeatailCounter', stockDetailCounterSchema);
module.exports.AllStockDetailSchema = mongoose.model('AllStockDetailSchema', allStockDetailSchema);
module.exports.SaleStockDetailSchema = mongoose.model('SaleStockDetailSchema', saleStockDetailSchema);