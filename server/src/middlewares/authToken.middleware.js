import jwt  from 'jsonwebtoken'
import userModel from '../models/user.model.js'

const authToken = async(req, res, next) => {

    const {Bubbles} = req.cookies
    if(!Bubbles) return res.json({success: false, message: 'Authentication failed. Please login'})

    try {

        const decodedToken = jwt.verify(Bubbles, process.env.JWT_KEY)
        if(!decodedToken.id) return res.json({success:false, message:`Authentication failed, Please login`})

        const user =  await userModel.findById(decodedToken.id)
        if(!user) return res.json({success: false, message:`Authentication failed, Please login`})

        req.user = user;
        // console.log(user)
        next();
        
    } catch (error) {
        
        console.log(`error in authToken: ${error.message}`)
        return res.json({success:false, message: `&{error.message}`})
        
    }
}
  
export default authToken;