const express = require('express');
const {authRoute,userRoute,leaveRoute} = require('./src/routes')
const db = require('./src/configs/db.config');
const cookieParser = require("cookie-parser");
const relationship = require('./src/models/relationship');
const app = express();

app.use(express.json());
app.use(cookieParser());

db.authenticate().then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log(err);
});

app.use('/auth',authRoute)
app.use('/user',userRoute)
app.use('/leave',leaveRoute)




db.sync().then(()=>{
    app.listen(5000,()=>{
        console.log('listening on port 5000')
    
    })
}).catch((err)=>{
    console.log(err);
});

module.exports = {
    app,db
}