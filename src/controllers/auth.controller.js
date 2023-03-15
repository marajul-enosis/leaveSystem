
const userService = require('../services/user.service');
const {sendError, sendSuccess,hash ,generateAuthToken,buildErrorFromSequelize} = require('../helpers/common.helper');
const user = require('../models/user');



async function login(req,res,next){

    // console.log("login");

    const {password,email} = req.body;

    if(!email || !password){
        sendError(res,400, new Error("Email and password and name is required"));
        return;
    }

    let queryres = await userService.findByEmail(email);
    // console.log(queryres)

    if(!queryres){
        sendError(res,400, new Error("Email or password is incorrect"));
        return;
    }

    if(queryres.password != hash(password)){
        sendError(res,400, new Error("Password is incorrect"));
        return;
    }else{
        
        // generate token and attach to user
        const token = generateAuthToken(queryres.email,queryres.id);
        queryres.token = token;
        
        // set cookie with token
        const cookieOptions = {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 5 * 60 * 60 * 1000, //  5 hour
        };
        res.cookie("token", token, cookieOptions);
        
        sendSuccess(res,200,queryres);
    }


    // res.send(result);

}


async function register(req,res,next){
    const body = req.body;

    const newUser = new user(body);

    try{
        const valRes = await newUser.validate();
    }catch(error){
        res.status(400).send({ status:"error", error: buildErrorFromSequelize(error) });
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

module.exports = {
    login,register
}