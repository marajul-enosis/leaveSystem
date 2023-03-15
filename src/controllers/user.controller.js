
const {sendError, sendSuccess} = require('../helpers/common.helper');
const userService = require('../services/user.service');

async function getUser(req,res,next){
    try{
        const userId = req.params.id;
        const result = await userService.findById(userId);
        sendSuccess(res,200,result);
    }catch(error){
        sendError(res,400,error);
    }
}

async function getUsers(req,res,next){
    try{
        const result = await userService.findAll();
        sendSuccess(res,200,result);
    }catch(error){
        sendError(res,400,error);
    }
    

}



async function updateUser(req,res,next){
    const { id } = req.params; // Get the user ID from the request parameters
    const { firstName, lastName, supervisor, dateOfBirth, email } = req.body; // Get the updated user information from the request body

  
    // Find the user to update by ID
    const userToUpdate = await userService.findById(id);

    // If the user does not exist, return an error
    if (!userToUpdate) {
        sendError(res,400, new Error("User does not exist"));
        res.end();
        return;
    }   

    // Update the user's information
    userToUpdate.firstName = firstName || userToUpdate.firstName;
    userToUpdate.lastName = lastName || userToUpdate.lastName;
    userToUpdate.supervisor = supervisor || userToUpdate.supervisor;
    userToUpdate.dateOfBirth = dateOfBirth || userToUpdate.dateOfBirth;
    userToUpdate.email = email || userToUpdate.email;

    // Save the updated user to the database
    try{
        const valRes = await userService.updateUser(userToUpdate,id);
        sendSuccess(res,200,'User updated successfully');
    }catch(error){
        sendError(res,400,error);
    }


    // Send a response indicating success
    
}

async function deleteUser(req,res,next){
    try{
        const userId = req.params.id;
        const result = await userService.deleteById(userId);
        sendSuccess(res,200,result);
    }catch(error){
        sendError(res,400,error);
    }
}


module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser
}