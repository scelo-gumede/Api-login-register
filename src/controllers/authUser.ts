
import User from "../models/loginAuth"

export const Register = async (req,res)=>{
    const user = await User.create(req.body)
    const token = user.createJWT()

    res.status(201).json({
        data:"user created",
        token
    })
}


export const  Login = async (req,res)=>{
    const{email,password}=req.body

    

    if(!password || !email){
        throw new Error("please fill in all the rewuired")
    }

    const user = await User.findOne({email})



    if(!user){
        throw new Error("user doesn't exist")
    }
    console.log(user)
    const isPasswordCorrect = await user.compare(password)
    if(!isPasswordCorrect){
        throw new Error("invalid credentials")
    }

    const token = user.createJWT()

    res.status(200).json({
        name : user.username,
        token
    })

}