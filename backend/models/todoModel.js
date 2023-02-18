
const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
   
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
   text:
   {
    type: String,
    require : [true , "please add a tExT field.."]
   },
   place:
   {
    type: String,
    require: [true, "Please add a place"]
   }
},
{
    timstamps : true
}
)

module.exports = mongoose.model('Todo', todoSchema)