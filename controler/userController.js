const { CompanyUser, CompanBankDetail,CompanyBasicDetail,CompanyTermsAndConditionDetail } = require('../Module/CompanyDetailModel');

// const  =  require('../Module/CompanyDetailModel');
const HttpError = require("../Module/httpError");
const userLoginname = [
    {
        username: 'JR modular',
        userid: '12',
        userPass: 'jrmodular123'
    },
    {
        username: 'Other1',
        userid: '13',
        userPass: 'jrmodular123'
    },
]

const companydetails =
{
    username: 'JR modular',
    companyName: 'JR MODULAR ENTERPRISES',
    companyTagLine: 'YOUR HOME OUR INTERIOR',
    companyAddress: 'Address: No.1/4, Mummurti Nagar Main Road, Chromepet, Chennai-600044', companyPhno: 'Contact: 8428952208',
    companymailid: 'mailto: jrmodularenterprises@gmail.com', companyOwner: 'Mr. JAFER HUSSAN',
    companyGstin: '', companyGstinStatename: '',
    companythankyou: "Thanking you and assuring our best services at all times.",
    companyDeleration: "We declare that the invoice details are the actual price of the goods.",
    companyOwner: "Mr. JAFER HUSSAN",
    companyPhno: "Contact: 8428952208",
    companymailid: "mailto: jrmodularenterprises@gmail.com",
}
    ;

const bankdet = [
    { id: 1, title: 'Bank Name', isvisible: true, value: 'AXIS BANK' },
    { id: 2, title: 'Branch', isvisible: true, value: 'Chromepet' },
    { id: 3, title: 'IFS Ccode', isvisible: true, value: 'UTIB0003905' },
    { id: 4, title: 'Account Number', isvisible: true, value: '923020005067138' },
    { id: 5, title: 'Account Holder Name', isvisible: true, value: 'JR MODULAR ENTERPRISES' },
];

let companydet = [
    { id: 1, title: 'Prices', isvisible: true, desc: 'Prices quoted are strictly as per the size, quantity and design SPECIFIED only, Any change in either one will result in change in quoted price, If any change in Government taxes & regulations it will be implicated in pricing as per actual.' },
    { id: 2, title: 'Billing format', isvisible: true, desc: 'Billing will be done for individual items & rates specified for individual items only tolerance of (+/-) 25mm will not affect the rate per Sqft quoted.' },
    { id: 3, title: 'Payment & Supply of Materials', isvisible: true, desc: '50% Advance' },
    { id: 4, title: '', isvisible: true, desc: '30% after start work' },
    { id: 5, title: '', isvisible: true, desc: '20% after completion' },
    { id: 6, title: '', isvisible: true, desc: 'Supply of materials will be done within 15 days from the date of receipt order and advance payments along with confirmed sizes & Design.' },
    { id: 7, title: '', isvisible: true, desc: 'The materials will be taken for production once the Order and advance payments are received. Work order & Payments to be made. We can also work in line with your schedule of works.' },
    { id: 8, title: 'Installation', isvisible: true, desc: 'We carry out the work once the materials reach the site. The Sequence of work will however have to be mutually agreed upon.' },
    { id: 9, title: 'Warranty', isvisible: true, desc: 'All the Extrusions used will carry a warranty of 15 years. All the accessories used will have a warranty of one year under any manufacturing defects. The above warranty does not include mishandling of products & natural calamities like fire, earth quake etc.,' },
];

let companyterms = [{ "id": 1, "title": "Prices", "isvisible": true, "desc": "Prices quoted are strictly as per the size, quantity and design SPECIFIED only, Any change in either one will result in change in quoted price, If any change in Government taxes & regulations it will be implicated in pricing as per actual." },
{ "id": 2, "title": "Billing format", "isvisible": true, "desc": "Billing will be done for individual items & rates specified for individual items only tolerance of (+/-) 25mm will not affect the rate per Sqft quoted." },
{ "id": 3, "title": "Payment & Supply of Materials", "isvisible": true, "desc": "50% Advance" }, { "id": 4, "title": "", "isvisible": true, "desc": "30% after start work" },
{ "id": 5, "title": "", "isvisible": true, "desc": "20% after completion" },
{ "id": 6, "title": "", "isvisible": true, "desc": "Supply of materials will be done within 15 days from the date of receipt order and advance payments along with confirmed sizes & Design." },
{ "id": 7, "title": "", "isvisible": true, "desc": "The materials will be taken for production once the Order and advance payments are received. Work order & Payments to be made. We can also work in line with your schedule of works." },
{ "id": 8, "title": "Installation", "isvisible": true, "desc": "We carry out the work once the materials reach the site. The Sequence of work will however have to be mutually agreed upon." }, { "id": 9, "title": "Warranty", "isvisible": true, "desc": "All the Extrusions used will carry a warranty of 15 years. All the accessories used will have a warranty of one year under any manufacturing defects. The above warranty does not include mishandling of products & natural calamities like fire, earth quake etc.," }, { "id": "55ea0c84-4a28-48e7-b41c-bb3fc0f06059", "title": "asd", "isvisible": true, "desc": "asd123" }];

let companybankdet = [
    { id: 1, title: 'Bank Name', isvisible: true, value: 'AXIS BANK' },
    { id: 2, title: 'Branch', isvisible: true, value: 'Chromepet' },
    { id: 3, title: 'IFS Ccode', isvisible: true, value: 'UTIB0003905' },
    { id: 4, title: 'Account Number', isvisible: true, value: '923020005067138' },
    { id: 5, title: 'Account Holder Name', isvisible: true, value: 'JR MODULAR ENTERPRISES' },
];
const findUser = async (req, res, next) => {
    console.log('req the user');
    return res.status(200).json('got user request');
}

const finduser = (user) => {
    let finduser = null;
    finduser = CompanyUser.find(item => {
        if (item.username === user) {
            return item;
        }
    });
    return finduser;
}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    // console.log('details ' + username + password);

    // finduser = userLoginname.find(item => {
    //     if (item.username === username) {
    //         if (item.password === password)
    //             return item;
    //     }

    // });

    let finduser;
    // console.log('user');

    try {
        finduser = await CompanyUser.find({ username: username, password: password });

    } catch (er) {
        throw new HttpError('error in login user' + er, 400);
    }
    console.log(finduser);
    if (finduser.length === 0) {
        console.log('undefined');
        res.status(224).json('not found');
    } else {
        res.status(200).json('found');
    }
};

const signIn = async (req, res, next) => {
    const { username, password } = req.body;
    // console.log('get ' + username + password);
    // let finduser = finduserpass(username, password);
    // if (finduser == undefined) {
    //     console.log('undefined');
    //     res.status(200).json('created');
    // } else {
    //     res.status(224).json('User alreay exist');
    // }

    let isUserexit, user;
    try {
        isUserexit = await CompanyUser.find({ username: username });
        // isUserexit = finduserpass(username, password);
        console.log('req the isUserexit find ' + isUserexit);
    } catch (er) {
        throw new HttpError('User find', 400);
    }
    if (isUserexit.length === 0) {
        console.log('undefined');
        try {
            user = new CompanyUser({
                username: username,
                password: password,
            });
            console.log('req user input ' + user);
            await user.save();
            console.log('req the isUserexit ' + isUserexit);
        } catch (er) {
            // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
            return res.status(400).json("error " + er);
        }
        return res.status(201).json({ message: 'User Created' });
    }
    else {
        res.status(200).json('User already exist');
    }

}

const getCompanyBankDetails =  async (req, res, next) => {
    const userid = req.params.userid;
    let  isCompanyBankDetails;
    try {
        isCompanyBankDetails = await CompanBankDetail.find({ userid: userid });
        // isCompanyBankDetails = finduserpass(username, password);
        console.log('req the isCompanyBankDetails find ' + isCompanyBankDetails);
    } catch (er) {
        throw new HttpError('User find', 400);
    }
    if (isCompanyBankDetails.length === 0) {
        console.log('undefined');
        res.status(224).json('Company Basic Details not found');
    }
    else {
        res.status(200).json(isCompanyBankDetails);
    }

} 

const addOrModifyCompanyBankDetails = async (req, res, next) => {
    const allbankdetails = req.body;
    const userid = req.params.userid;
    console.log('get ' + allbankdetails);
    let singlebankdetail;
    for (let i = 0; i < allbankdetails.length; i++) {
        singlebankdetail = allbankdetails[i];
        let existbankdet, updatebankdet, newbankdetal;
        try {
            updatebankdet = await CompanBankDetail.find({ id: singlebankdetail.id, userid:userid });

        } catch (er) {
            throw new HttpError('error addOrModifyCompanyBankDetails exist search', 400);
        }
        //  console.log('updatebankdet');
        //console.log(updatebankdet);
        if (updatebankdet.length === 0) {
            try {
                newbankdetal = new CompanBankDetail({
                    id: singlebankdetail.id,
                    userid: userid,
                    title: singlebankdetail.title,
                    value: singlebankdetail.value,
                    isvisible: singlebankdetail.isvisible
                });
                await newbankdetal.save({ upsert: true });
            } catch (er) {
                // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
                return res.status(400).json("error " + er);
            }
        }
        else {

            existbankdet = updatebankdet[0];
            // console.log('existbankdet');
            // console.log(existbankdet);
            existbankdet.title = singlebankdetail.title;
            existbankdet.value = singlebankdetail.value;
            existbankdet.isvisible = singlebankdetail.isvisible;
            try {
                await existbankdet.save({ upsert: true });
            } catch (er) {
                // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
                return res.status(400).json("error " + er);
            }

        }

    }
    res.status(200).json('Bank Details updated');
    // let companydetail = findCompanyDetails(username);
    // console.log(companydetail);
    // if (companydetail == undefined) {
    //     console.log('undefined');
    //     res.status(200).json('inserted');
    // } else {

    //     res.status(200).json('updated');
    // }
}

const getCompanyBasicDetails =  async (req, res, next) => {
    const userid = req.params.userid;
    let  isCompanyBasicDetails;
    try {
        isCompanyBasicDetails = await CompanyBasicDetail.find({ userid: userid });
        // isCompanyBasicDetails = finduserpass(username, password);
        console.log('req the isCompanyBasicDetails find ' + isCompanyBasicDetails);
    } catch (er) {
        throw new HttpError('User find', 400);
    }
    if (isCompanyBasicDetails.length === 0) {
        console.log('undefined');
        res.status(224).json('Company Basic Details not found');
    }
    else {
        res.status(200).json(isCompanyBasicDetails);
    }

} 

const addOrModifyCompanyBasicDetails =  async (req, res, next) => {
    const basicdetail = req.body;
    const userid = req.params.userid;
    let  existCompanyBasicDetails,isCompanyBasicDetails;
    try {
        isCompanyBasicDetails = await CompanyBasicDetail.find({ userid: userid });
        // isCompanyBasicDetails = finduserpass(username, password);
        console.log('req the isCompanyBasicDetails find ' + isCompanyBasicDetails);
    } catch (er) {
        throw new HttpError('User find', 400);
    }
    if (isCompanyBasicDetails.length === 0) {
        console.log('undefined');
        try {
            isCompanyBasicDetails = new CompanyBasicDetail({
                userid:userid,
                companyName: basicdetail.companyName,
                companyTagLine: basicdetail.companyTagLine,
                companyAddress: basicdetail.companyAddress,
                companyPhno: basicdetail.companyPhno,
                companymailid: basicdetail.companymailid,
                companyGstin: basicdetail.companyGstin,
                companyGstinStatename: basicdetail.companyGstinStatename,
                companyOwner: basicdetail.companyOwner,
                companyDeleration: basicdetail.companyDeleration,
                companythankyou: basicdetail.companythankyou,
            });
            console.log('req user input ' + isCompanyBasicDetails);
            await isCompanyBasicDetails.save();
            console.log('req the isCompanyBasicDetails ' + isCompanyBasicDetails);
        } catch (er) {
            // return next(new HttpError('error in DB connection in CompanyBasicDetails process'+er,404));
            return res.status(400).json("error " + er);
        }
        return res.status(201).json({ message: 'Company Basic Details Created' });
    }
    else {
        existCompanyBasicDetails=isCompanyBasicDetails[0];
        existCompanyBasicDetails.companyName= basicdetail.companyName;
        existCompanyBasicDetails.companyTagLine= basicdetail.companyTagLine;
        existCompanyBasicDetails.companyAddress= basicdetail.companyAddress;
        existCompanyBasicDetails.companyPhno= basicdetail.companyPhno;
        existCompanyBasicDetails.companymailid= basicdetail.companymailid;
        existCompanyBasicDetails.companyGstin= basicdetail.companyGstin;
        existCompanyBasicDetails.companyGstinStatename= basicdetail.companyGstinStatename;
        existCompanyBasicDetails.companyOwner= basicdetail.companyOwner;
        existCompanyBasicDetails.companyDeleration= basicdetail.companyDeleration;
        existCompanyBasicDetails.companythankyou= basicdetail.companythankyou;
        try{
            await existCompanyBasicDetails.save();
        }  catch (er) {
            // return next(new HttpError('error in DB connection in CompanyBasicDetails process'+er,404));
            return res.status(400).json("error " + er);
        }
        res.status(200).json('Company Details Updated');
    }

} 

const findCompanyDetails = (user) => {
    let compdetail = companydetails.find(item => {
        return item.username === user;
    });
    return compdetail;
}
const getCompanyTermsAndConditionDetail = async (req, res, next) => {
    const userid = req.params.userid;
    let  isCompanyTermsAndConditionDetails;
    try {
        isCompanyTermsAndConditionDetails = await CompanyTermsAndConditionDetail.find({ userid: userid });
        // isCompanyTermsAndConditionDetails = finduserpass(username, password);
        console.log('req the isCompanyTermsAndConditionDetails find ' + isCompanyTermsAndConditionDetails);
    } catch (er) {
        throw new HttpError('User find', 400);
    }
    if (isCompanyTermsAndConditionDetails.length === 0) {
        console.log('undefined');
        res.status(224).json('Company TermsAndCondition Details not found');
    }
    else {
        res.status(200).json(isCompanyTermsAndConditionDetails);
    }

}

const addOrModifyCompanyTermsAndConditionDetail = async (req, res, next) => {
    const allTermsAndConditionDetails = req.body;
    const userid = req.params.userid;
    console.log('get ' + allTermsAndConditionDetails);
    let singleTermsAndConditionDetails;
    for (let i = 0; i < allTermsAndConditionDetails.length; i++) {
        singleTermsAndConditionDetails = allTermsAndConditionDetails[i];
        let existTermsAndConditiondet, updateTermsAndConditiondet, newTermsAndConditiondetal;
        try {
            updateTermsAndConditiondet = await CompanyTermsAndConditionDetail.find({ id: singleTermsAndConditionDetails.id, userid:userid });

        } catch (er) {
            throw new HttpError('error addOrModifyCompanyTermsAndConditionDetails exist search', 400);
        }
        //  console.log('updateTermsAndConditiondet');
        //console.log(updateTermsAndConditiondet);
        if (updateTermsAndConditiondet.length === 0) {
            try {
                newTermsAndConditiondetal = new CompanyTermsAndConditionDetail({
                    id: singleTermsAndConditionDetails.id,
                    userid: userid,
                    title: singleTermsAndConditionDetails.title,
                    value: singleTermsAndConditionDetails.value,
                    isvisible: singleTermsAndConditionDetails.isvisible
                });
                await newTermsAndConditiondetal.save({ upsert: true });
            } catch (er) {
                // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
                return res.status(400).json("error " + er);
            }
        }
        else {

            existTermsAndConditiondet = updateTermsAndConditiondet[0];
            // console.log('existTermsAndConditiondet');
            // console.log(existTermsAndConditiondet);
            existTermsAndConditiondet.title = singleTermsAndConditionDetails.title;
            existTermsAndConditiondet.value = singleTermsAndConditionDetails.value;
            existTermsAndConditiondet.isvisible = singleTermsAndConditionDetails.isvisible;
            try {
                await existTermsAndConditiondet.save({ upsert: true });
            } catch (er) {
                // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
                return res.status(400).json("error " + er);
            }

        }

    }
    res.status(200).json('TermsAndCondition Details updated');
}

exports.findUser = findUser;
exports.loginUser = loginUser;
exports.signIn = signIn;
exports.getCompanyTermsAndConditionDetail = getCompanyTermsAndConditionDetail;
exports.addOrModifyCompanyTermsAndConditionDetail = addOrModifyCompanyTermsAndConditionDetail;
exports.addOrModifyCompanyBankDetails = addOrModifyCompanyBankDetails;
exports.addOrModifyCompanyBasicDetails=addOrModifyCompanyBasicDetails;
exports.getCompanyBasicDetails =getCompanyBasicDetails;
exports.getCompanyBankDetails =getCompanyBankDetails;