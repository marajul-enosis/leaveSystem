
const leave = require('../models/leave');
const {sendError, sendSuccess,hash ,generateAuthToken,buildErrorFromSequelize} = require('../helpers/common.helper');

async function createLeave(req,res,next){


    const {userId} = req.user;
    let body = req.body;

    try{
        const newLevae = new leave(body);
        const valRes = await newLevae.validate();
        res.send(newLevae)
    }catch(error){
        res.status(400).send({ status:"error", error: buildErrorFromSequelize(error) });
        return res.end()
    }

    body.userId = userId;




    


    
}

var leaveController = {
    createLeave
}

module.exports = leaveController;