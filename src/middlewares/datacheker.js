//this will check for Data if are existed
import UserInfos from "../models/user";

class DataChecker {

    // check if user email exit
    static async isEmailExist (req,res,next){  //next function call a follower one after validate input in router
        const user =await UserInfos.findOne({email:req.body.email});

        if (!user){
            return next();
        }
        return res.status(401).json({error:"email already exist"})
    }
}
export default DataChecker;