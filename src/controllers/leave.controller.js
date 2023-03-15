
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

async function getOwnLeaves(req,res,next){
    try{
        const {userId} = req.user;
        const result = await leaveService.findByUserId(userId);
        sendSuccess(res,200,result);
    }catch(error){
        sendError(res,400,error);
    }
}

async function getLeaveById(req,res,next){
    try{
        const leaveId = req.params.id;
        const result = await leaveService.findById(leaveId);
        sendSuccess(res,200,result);
    }catch(error){
        sendError(res,400,error);
    }
}

async function getAllLeaves(req,res,next){
    try{
        const result = await leaveService.findAll();
        sendSuccess(res,200,result);
    }catch(error){
        sendError(res,400,error);
    }
}

async function deleteLeave(req,res,next){
    try{
        const leaveId = req.params.id;
        const result = await leaveService.deleteById(leaveId);
        sendSuccess(res,200,result);
    }catch(error){
        sendError(res,400,error);
    }
}

async function updateLeave(req,res,next){
    
}

var leaveController = {
    createLeave,
    getOwnLeaves,
    getLeaveById,
    getAllLeaves,
    deleteLeave,
    updateLeave
}

module.exports = leaveController;