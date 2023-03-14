const { Client } = require('pg')
const config = require('../configs/db.config')

 


async function query(sql, params) {
    try{
        const client = new Client(config)
        const connection = await client.connect();
        const res = await client.query(sql, params)
        return res;
    }catch(error){
        return error;
    }
    
}


// client.connect((err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Connected to database');
//     }
// });



// module.exports = db;

module.exports = query;
