const { application } = require('express');
const express=require('express');
const router=express.Router()
console.log('STARTED');
const homeController=require('../controllers/home_controller')
router.get('/',homeController.home);
router.use('/users',require('./users'))
//for any another routes access from here
//router.use('./routerName',require('./routerfield'))








module.exports=router;