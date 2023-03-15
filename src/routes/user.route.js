const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const {authMiddleware} = require('../middlewares/authMiddleware');


userRouter.use(authMiddleware)

userRouter.get('/:id', userController.getUser)
userRouter.get('/', userController.getUsers)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id',userController.deleteUser)

module.exports = userRouter;


