const express = require('express');
const itemsModel = require('../models/itemsModel');
const router = express.Router();

router.get('/items', async (req,res) => {
    try {
        const items = await itemsModel.find();
        // res.status(items.map((obj)=> console.log(obj.name,obj.category)))
        console.log("items = ",items);
        res.send(items);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/items/add-item', async (req,res) => {
    try {
        const newItem = new itemsModel(req.body);
        await newItem.save();
        console.log(items);
        res.send("item added successfully");
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/items/edit-item', async (req,res) => {
    try {
       const res= await itemsModel.findOneAndUpdate({_id : req.body.itemId}, req.body)
        console.log(res);
        res.send("item updated successfully");
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/items/delete-item', async (req,res) => {
    try {
       const res= await itemsModel.findOneAndDelete({_id : req.body.itemId})
        console.log(res);
        res.send("item deleted successfully");
    } catch (err) {
        res.status(400).json(err);
    }
})


module.exports = router;