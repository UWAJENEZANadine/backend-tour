import  express  from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routes/userRoutes";
import tourRouter from "./src/routes/tourRoutes";


dotenv.config("./.env");

const app= express ();

app.use(bodyParser.json()); // go and use data in json file  
app.use("/user",userRouter); //use path from userRouter
app.use("/tour",tourRouter);

app.use("/", (req,res)=>res.status(200).json({  //status(200) is ok as a request
    message:"This is Tour BackEnd"
}));

const dbUrl=process.env.DATABASEURL;
mongoose.connect(dbUrl).then(()=> console.log("Database connect successfully"));

const port =process.env.PORT;

app.listen(port,()=>{

  console.log(`Server is running on Port ${port}`);
})
export default app;