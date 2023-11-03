const express = require("express");
const router = express.Router();

router.post('/test',(req,res)=>{
    res.send(' xin chào Việt Nam')
})

module.exports = router;
