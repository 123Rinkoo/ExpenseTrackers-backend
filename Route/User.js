const express = require('express');
const router = express.Router();
const User = require('../model/user')

router.post("/SigningUp", (req, res, next) => {
    // console.log(req.body.key1, req.body.key2, req.body.key3);  
    User.findAll()
        .then(users => {
            // console.log(users[0].email)
            // const findemail=users.find(element.email=> element.email==req.body.key2)
            var found = users.find(function (element) {
                return element.email == req.body.key2;
            });
            if (!found) {
                User.create({ name: req.body.key1, email: req.body.key2, password: req.body.key3 });
                
            }
            else{
                // console.log('user exist');
                return res.status(500).json({success: false, message:"User already exists"})
            }
        })
        .catch(err => console.log(err));
})

router.post('/login',(req, res, next)=>{
    // console.log(req.body.key1, req.body.key2);
    User.findAll()
        .then(users => {
            // console.log(users[0].email)
            // const findemail=users.find(element.email=> element.email==req.body.key2)
            var found = users.find(function (element) {
                return element.email == req.body.key1;
            });
            if (!found) {
               return res.status(404).json({success: false, message:"User doesnot exist"});  
            }
            else if(found.password!== req.body.key2){
                return res.status(500).json({success: false, message:"Password is wrong"}); 
            }
            else{
                return res.status(200).json({success: true, message:"Your are succesfully login"});
            }
        })
        .catch(err => console.log(err));

})

module.exports = router;