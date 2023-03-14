
const {sendError, sendSuccess} = require('../helpers/common.helper');
const userService = require('../services/user.service');

async function getUser(req,res,next){

}

async function getUsers(req,res,next){

}

async function createUser(req,res,next){
    const body = req.body;

    if(!body.email || !body.password || !body.firstName || !body.lastName || !body.designation || !body.dateOfBirth){
        sendError(res,400, new Error("Email and password and name designation dob is required"));
        return;
    }

    const result = await userService.CountByEmail(body.email);

    // console.log(result);
    
    if(result!=0){
        sendError(res,400, new Error("Email already exists"));
        return;
    }else{
         userService.create(body).then((data)=>{
            sendSuccess(res,200,data);
        }).catch((error)=>{
            sendError(res,400,error);
        })
    }
}

async function updateUser(req,res,next){

}

async function deleteUser(req,res,next){
    
}


module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}