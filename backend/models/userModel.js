const mongoose =  require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true , 'Please add a name of user']
    },
    email:{
        type: String,
        required: [true , 'Please add a email']
    },
    password:{
        type: String,
        required: [true , 'Please add password']
    }        
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)