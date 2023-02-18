const { urlencoded } = require('body-parser');
const color = require('color')
const express = require('express');
const { connectDb } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv =  require('dotenv').config()
const port  = process.env.PORT || 500;

connectDb()
const app =  express()
app.use(express.json())
app.use(urlencoded({ extended: false}))

app.use('/api/todos', require('./routes/todosRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})