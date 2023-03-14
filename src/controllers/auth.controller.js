
const userService = require('../services/user.service');
const {sendError, sendSuccess,hash ,generateAuthToken} = require('../helpers/common.helper');



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
        sendError(res,400, new Error("Email or password is incorrect"));
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


module.exports = {
    login
}