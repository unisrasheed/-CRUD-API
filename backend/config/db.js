const mongoose =  require('mongoose')

const connectDb = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database connected on ${conn.connection.host}`)
}


module.exports = 
{ 
    connectDb,



}
