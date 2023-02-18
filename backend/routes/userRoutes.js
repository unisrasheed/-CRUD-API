const express = require('express')
const userRouter = express.Router()
const {createUser, loginUser, getTodo} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')


userRouter.post('/', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/me',protect, getTodo)


module.exports = userRouter