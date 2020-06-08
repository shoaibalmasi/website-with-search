const express = require('express');
const router = express.Router();
const path=require('path');
const fs=require('fs');


//get products pages
router.get('/:product',function(req,res){
    fs.readFile('./db/list.json','utf8',function(err,data){
        if(err){
        console.log(err);
            
        }else{
            let shoes=JSON.parse(data);
            res.render(`pages/${req.params.product}`,{shoes})
        }
       
    })
})




module.exports=router;

