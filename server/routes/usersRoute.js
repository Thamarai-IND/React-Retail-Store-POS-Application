const express = require('express');
const usersModel = require('../models/usersModel');
const router = express.Router();

router.post('/login', async (req,res) => {
    try {
        console.log(req.body.userId, req.body.password);
        const response = await usersModel.findOne({userId : req.body.userId, password: req.body.password, verified:false});
        
        if(response){
            res.status(200).json({message:"login success",response})
        }
        else {
            res.status(401).json({message:"login failed"})
        }
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/register', async (req,res) => {
    try {
        const newUser = await usersModel({...req.body, verified:false});
        await newUser.save();
        console.log("users = ",newUser);
        res.send("User Registered Successfully");
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;