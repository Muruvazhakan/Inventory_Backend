const  CompanyUser =require('../Module/CompanyDetailModel');
const userLoginname = [
    {
        username: 'JR modular',
        userid:'12',
        userPass: 'jrmodular123'
    },
    {
        username: 'Other1',
        userid:'13',
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
        companythankyou:"Thanking you and assuring our best services at all times.",
        companyDeleration:"We declare that the invoice details are the actual price of the goods.",
        companyOwner:"Mr. JAFER HUSSAN",
        companyPhno:"Contact: 8428952208",
        companymailid:"mailto: jrmodularenterprises@gmail.com",
    }
;

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

let  companybankdet = [
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

const finduserpass = (user, pass) => {
    let finduser = null;
    finduser = userLoginname.find(item => {
        if (item.username === user) {
            if (item.password === pass)
                return item;
        }
    });
    return finduser;
}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    console.log('details ' + username + password);

    // finduser = userLoginname.find(item => {
    //     if (item.username === username) {
    //         if (item.password === password)
    //             return item;
    //     }

    // });
    let finduser = finduserpass(username, password);

    if (finduser == undefined) {
        console.log('undefined');
        res.status(224).json('not found');
    } else {
        res.status(200).json('found');
    }

    // console.log('user');
    // console.log(finduser);
    // let verifypass;

    // try{
    //     verifypass = userLoginname.find(item =>{
    //         reu
    //     })
    // } 
}

const signIn = async (req, res, next) => {
    const { username, password } = req.body;
    console.log('get ' + username + password);
    // let finduser = finduserpass(username, password);
    // if (finduser == undefined) {
    //     console.log('undefined');
    //     res.status(200).json('created');
    // } else {
    //     res.status(224).json('User alreay exist');
    // }

    let isUserexit,user;
    // try{
    //     isUserexit = await CompanyUser.find({username:username});
    //     console.log('req the isUserexit find '+isUserexit);
    // }catch (er){
    //     throw new HttpError('User find',400);
    // }
    try{
        user= new CompanyUser({ 
            username:username,
            password:password,
        });
        console.log('req user input '+user);
        await user.save();
        console.log('req the isUserexit '+isUserexit);
    }catch (er){
        // return next(new HttpError('error in DB connection in isUserexit process'+er,404));
        return res.status(400).json("error "+er);
    }
    return res.status(201).json({message:'User Created'});

}

const findCompanyDetails = (user) => {
    let compdetail = companydetails.find(item => {
        return item.username === user;
    });
    return compdetail;
}
const getCompanyDetails = async (req, res, next) => {
    const { username } = req.body;
    console.log('get ' + username);
    let companydetail = findCompanyDetails(username);
    console.log(companydetail);
    if (companydetail == undefined) {
        console.log('undefined');
        res.status(224).json('not found');
    } else {
        res.status(200).json(companydetail);
    }

}

const updateCompanyDetails = async (req, res, next) => {
    const { username } = req.body;
    console.log('get ' + username);
    let companydetail = findCompanyDetails(username);
    console.log(companydetail);
    if (companydetail == undefined) {
        console.log('undefined');
        res.status(200).json('inserted');
    } else {

        res.status(200).json('updated');
    }
}

exports.findUser = findUser;
exports.loginUser = loginUser;
exports.signIn = signIn;
exports.getCompanyDetails = getCompanyDetails;
exports.updateCompanyDetails = updateCompanyDetails;