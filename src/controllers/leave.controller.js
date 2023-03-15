
const leave = require('../models/leave');
const leaveService = require('../services/leave.service');
const {sendError, sendSuccess,hash ,generateAuthToken,buildErrorFromSequelize} = require('../helpers/common.helper');

async function createLeave(req,res,next){


    const {userId} = req.user;
    let body = req.body;

    try{
        const newLevae = new leave(body);
        const valRes = await newLevae.validate();
        // res.send(newLevae)
    }catch(error){
        res.status(400).send({ status:"error", error: buildErrorFromSequelize(error) });
        return res.end()
    }

    body.userId = userId;

    const countRes = await leaveService.countByDate(userId,body.from,body.to);

    if(countRes!=0){
        sendError(res,400, new Error("You have already applied leave for this date"));
        return;
    }else{
        leaveService.create(body).then((data)=>{
            sendSuccess(res,200,data);
        }).catch((error)=>{
            sendError(res,400,error);
        })
    }

    
}

var leaveController = {
    createLeave
}

module.exports = leaveController;