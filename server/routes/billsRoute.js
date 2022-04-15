const express = require('express');
const billsModel = require('../models/billModel');
const router = express.Router();

router.post('/charge-bill', async (req,res) => {
    try {
        console.log(req.body);
        const newBill = new billsModel(req.body);
        await newBill.save()
        // res.status(items.map((obj)=> console.log(obj.name,obj.category)))
        console.log("new bill = ",newBill);
        res.send("Bill charged successfully");
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/get-all-bills', async(req,res) => {
    try {
        const bills = await billsModel.find()
        res.send(bills);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;