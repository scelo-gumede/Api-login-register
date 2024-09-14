import jsonwebtoken from "jsonwebtoken"

const jwt = jsonwebtoken


export const auth = async (req,res,next)=>{
    const authorization = req.headers.authorization

    if(!authorization || !authorization.startsWith("Bearer ")){
        throw new Error("unauthenticated user")
    }

    const token = authorization.split(" ")[1]

    try{
        const decoded = jwt.verify(token,process.env.JWT)
        const{userId}=decoded
        req.user={userId}
        next()
    }catch(err){
        console.error(err)
    }

}
