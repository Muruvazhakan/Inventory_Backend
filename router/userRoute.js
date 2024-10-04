const express = require('express');
const router =express();

const userRoute = require('../controler/userController');

router.get('/',userRoute.findUser);
router.post('/login',userRoute.loginUser);
router.post('/signin',userRoute.signIn);
router.post('/getcompany',userRoute.getCompanyDetails);
router.post('/updatecompany',userRoute.updateCompanyDetails);

module.exports=router;