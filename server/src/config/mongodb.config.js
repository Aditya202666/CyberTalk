import mongoose from 'mongoose'

export const connectDb = async() =>{

    try {

        mongoose.connection.on('connected', ()=>{ console.log(`connected to database`)})
        mongoose.connection.on('disconnected', ()=>{ console.log(`database disconnected`)})
        
        mongoose.connect(process.env.MONGODB_URI)

    } catch (error) {
        console.log(`error in connectDb: ${error.message}`)
        process.exit(1)
    }

}