import mongoose,{Schema,Document} from "mongoose"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"



const jwt = jsonwebtoken

interface User extends Document{
    username:string,
    email:string,
    password:string,
    createJWT():string,
    compare(param:string): Promise<boolean>
}


const userSchema = new Schema<User>({
    username:{
        type:String,
        minLength:[5,"the usernam must be a minimum of 5"],
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre( "save",async function() {
    const salt =await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT=function createJWT(){
    return jwt.sign({userId:this._id,name:this.username},"srcrehhryf",{expiresIn:"30d"})
}

userSchema.methods.compare=async function (param:string){
    const comparedPass = await bcrypt.compare(param,this.password)
    return comparedPass
}

export default mongoose.model<User>("User",userSchema)