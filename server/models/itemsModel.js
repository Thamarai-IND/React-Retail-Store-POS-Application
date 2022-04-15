const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    image:{type:String, required:true},
    
},{timestamps:true})

const itemsModel = mongoose.model('items',itemSchema)
console.log(itemsModel);
console.log('hey');
module.exports = itemsModel;