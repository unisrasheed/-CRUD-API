const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler =  require('express-async-handler')
const User  =  require('../models/userModel')
const { use } = require('../routes/userRoutes')

const createUser =asyncHandler( async(req, res) =>{

    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all the fields')
    }

    // check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    
    // Generate Salt for making a hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a user

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
       
    })

    // after creating the user display it
    if(user){
        res.status(201)
        res.json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('invalid user credentials')
    }
}
)


const loginUser =asyncHandler( async(req, res) =>{
    const { email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password , user.password))){
        res.status(200)
        res.json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }

}
)
const getTodo =asyncHandler( async(req, res) =>{
  const {_id , name, email} = await User.findById(req.user.id)
  res.status(200)
  res.json({
    _id, name, email, 
  })
}
)

// Generate a jwt
const generateToken = (id)=>{
    return jwt.sign( {id}, process.env.JWT_SECRET ,{
        expiresIn: '30d'
    })
}

module.exports = {
    createUser,
    loginUser,
    getTodo
}
