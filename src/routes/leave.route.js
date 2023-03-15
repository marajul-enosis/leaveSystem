const express = require('express');
const leaveRouter = express.Router();
const leaveController = require('../controllers/leave.controller');
const {authMiddleware} = require('../middlewares/authMiddleware');


leaveRouter.use(authMiddleware)

// leaveRouter.get('/:id', userController.getUser)
// leaveRouter.get('/', userController.getUsers)
// leaveRouter.put('/:id', userController.updateUser)
// leaveRouter.delete('/:id',userController.deleteUser)

leaveRouter.post('/', leaveController.createLeave)
leaveRouter.get('/', leaveController.getOwnLeaves)
leaveRouter.get('/all', leaveController.getAllLeaves)
leaveRouter.get('/:id', leaveController.getLeaveById)

leaveRouter.delete('/:id',leaveController.deleteLeave)
leaveRouter.put('/:id',leaveController.updateLeave)



module.exports = leaveRouter;


