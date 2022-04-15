const express = require('express');
const DBconnect = require('./mongoDBConnect');
//const data = require('./statisData.json')
const app = express();
app.use(express.json());

const itemsRoute = require('./routes/itemsRoute');
const usersRoute = require('./routes/usersRoute');
const billsRoute = require('./routes/billsRoute');
app.use('/api', itemsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bills', billsRoute)
app.get('/',(req,res) => {
    res.send("connecting from backend")
})

const path = require('path');

if(process.env.NODE_ENV==='production') {
    app.use('/',express.static('pos-client/build'))
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname,'pos-client/build/index.html'))
    })
}


const port = process.env.PORT || 4000;

app.listen(port,()=> {
    console.log(`server running at Port ${port}`);
})
//console.log(data);