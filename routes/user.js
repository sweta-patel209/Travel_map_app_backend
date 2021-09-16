const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register new User and also we have to generate new bcrypt password so in database noone an see password

router.post("/register", async(req,res)=>{
    
    try{
        //generate new encrypted password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })

        //save user and send response        
        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err)
    }
})

//Login for already existed user

router.post("/login", async (req,res)=>{
    try{
        //find user
        const user = await User.findOne({
            username:req.body.username
        })
        !user && res.status(400).json("wrong username or password")
        
        //validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong username or password")
        
        //send successfull res
        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router