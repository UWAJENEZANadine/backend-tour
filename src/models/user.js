
import mongoose from 'mongoose';

const userSchema=new mongoose.Schema(
   {
    firstName:{
        type:String,
        required:[true, "first-name must be required"]
    },

    lastName:String,
    email:{
        type:String,
        unique:true
       
    },
    password:{
        type:String,
        
   
    },
    address:{
        type:String,
        default:"Rwanda",
    },
    role:{
        type:String,
        default:"user",
        enum:["admin","user"]
    },
   gender:{
       type:String,
       enum:["male","female","other"],
   },
   age:{
        type: String
   }

   },

    {
    timestamps:true,
    }

  );
  const user =mongoose.model('User',userSchema);

  export default user;
