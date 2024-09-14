import express from "express"
import helmet from "helmet";
import cors from "cors"
import { auth } from "./middleware/authMiddleawre";
import UserRouter from "./routes/userRoutes"
const mongoose = require('mongoose');
require("express-async-errors")
require("dotenv").config()

//config
const app = express()
const corsSet = cors({
    origin:"https://localhost:3000"
})

//start middlewares
app.use(express.json())



//routes
app.use("/api/v1",UserRouter)




//end middlewares





//star db 

const uri = "mongodb+srv://scelogumede95:72664453@practice.kmvig.mongodb.net/JWBAPI?retryWrites=true&w=majority&appName=practice";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    app.listen(3000, ()=> console.log("that the server starting"))
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(err){
    // Ensures that the client will close when you finish/error
    console.log(err)
  }
}
run()
