const express = require('express');
const { signup, signin, signout} = require('../../controller/admin/auth');
const { validateSignUpRequest, isRequestValidated, validateSignInRequest  } = require('../../validators/auth');
const router = express.Router();
const {requireSignin} = require('../../common-middleware/index')

router.post('/admin/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin);
router.post('/admin/signout', signout);


module.exports = router;