const mongooes = require("mongoose");

const uniquevalidator = require("mongoose-unique-validator");

const schema = mongooes.Schema;

const companyUserSchema = new schema({
    username: {type:String, required: true},
    password: {type:String, required: true, minlength:6},
},{
    strictPopulate: false
});

companyUserSchema.plugin(uniquevalidator);
module.exports = mongooes.model('CompanyUser',companyUserSchema);