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

module.exports = leaveRouter;


