
const userLoginname = [
    {
        username: 'JR modular',
        userPass: 'jrmodular123'
    },
    {
        username: 'Other1',
        userPass: 'jrmodular123'
    },
]

const companydetails = [
    {
        username:'JR modular',
        companyName:'JR MODULAR ENTERPRISES',
        companyTagLine :'YOUR HOME OUR INTERIOR', 
        companyAddress:'Address: No.1/4, Mummurti Nagar Main Road, Chromepet, Chennai-600044',companyPhno :'Contact: 8428952208', 
        companymailid:'mailto: jrmodularenterprises@gmail.com',companyOwner :'Mr. JAFER HUSSAN',
        companyGstin:'', companyGstinStatename:'',
    }

]
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
    let finduser = finduserpass(username, password);
    if (finduser == undefined) {
        console.log('undefined');
        res.status(200).json('created');
    } else {
        res.status(224).json('User alreay exist');
    }

}

const findCompanyDetails = (user) =>{
    let compdetail= companydetails.find(item =>{
        return item.username ===user;
    });
    return compdetail;
}
const getCompanyDetails = async(req,res,next) =>{
    const { username } = req.body;
    console.log('get ' + username );
    let companydetail= findCompanyDetails(username);
    console.log(companydetail);
    if (companydetail == undefined) {
        console.log('undefined');
        res.status(224).json('not found');
    } else {
        res.status(200).json(companydetail);
    }

}

const updateCompanyDetails = async(req,res,next) =>{
    const { username } = req.body;
    console.log('get ' + username );
    let companydetail= findCompanyDetails(username);
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