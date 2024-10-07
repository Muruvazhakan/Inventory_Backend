const mongooes = require("mongoose");

const uniquevalidator = require("mongoose-unique-validator");

const schema = mongooes.Schema;

const companyUserSchema = new schema({
    userid: {type:String, required: true},
    username: {type:String, required: true},
    password: {type:String, required: true, minlength:6},
},{
    strictPopulate: false
});

const companyBasicDetailSchema = new schema({
    userid:{type:String, required: true},
    companyName: {type:String, required: true},
    companyTagLine: {type:String},
    companyAddress: {type:String},
    companyPhno: {type:String},
    companymailid: {type:String},
    companyGstin: {type:String},
    companyGstinStatename: {type:String},
    companyOwner: {type:String, required: true},
    companyDeleration: {type:String},
    companythankyou: {type:String},
});

const companyTermsAndConditionDetailSchema = new schema({
    userid:{type:String, required: true},
    id:{type:String, required: true},
    title:{type:String},
    isvisible:{type:String, required: true},
    desc:{type:String, required: true},
    order:{type:String}
})

const companyBankDetailSchema = new schema({
    userid:{type:String, required: true},
    id:{type:String, required: true},
    title:{type:String, required: true},
    isvisible:{type:String, required: true},
    value:{type:String, required: true},
    order:{type:String}
});

companyUserSchema.plugin(uniquevalidator);
module.exports.CompanyUser = mongooes.model('CompanyUser',companyUserSchema);
module.exports.CompanyBasicDetail = mongooes.model('companyBasicDetail',companyBasicDetailSchema);
module.exports.CompanBankDetail = mongooes.model('CompanBankDetail',companyBankDetailSchema);
module.exports.CompanyTermsAndConditionDetail = mongooes.model('CompanyTermsAndConditionDetail',companyTermsAndConditionDetailSchema);