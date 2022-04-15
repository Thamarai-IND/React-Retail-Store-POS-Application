const mongoose = require('mongoose');

const URL = "mongodb+srv://thamarai:thamarai@cluster0.0r3xr.mongodb.net/Retail-POS";

mongoose.connect(URL);

let connectionObj = mongoose.connection;

connectionObj.on('connected', ()=>{
    console.log('MongoDB connection successful');
})

connectionObj.on('error', ()=>{
    console.log('MongoDB connection failure');
})