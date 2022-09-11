const express=require('express');
const router=express.Router();
router.use('/v1',require('./v1'));
//api dont have cookies so no authentiction works like passport
module.exports=router;