const express = require('express');
const router =express();

const userRoute = require('../controler/userController');

router.get('/',userRoute.findUser);
router.post('/login',userRoute.loginUser);
router.post('/signin',userRoute.signIn);
router.get('/getcompanybasic/:userid',userRoute.getCompanyBasicDetails);
router.post('/savecompanybasic/:userid',userRoute.addOrModifyCompanyBasicDetails);
router.post('/gettermsandconditioncompany/:userid',userRoute.getCompanyTermsAndConditionDetail);
router.post('/savetermsandconditioncompany/:userid',userRoute.addOrModifyCompanyTermsAndConditionDetail);
router.get('/getcompanybank/:userid',userRoute.getCompanyBankDetails);
router.post('/savecompanybank/:userid',userRoute.addOrModifyCompanyBankDetails);


module.exports=router;