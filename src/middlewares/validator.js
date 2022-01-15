// this file will validate all function created ex, create user,...
// this will check for rules 
import {check, validationResult} from "express-validator";
class Validator{
    
    static validateInput =(req,res,next)=> {

        const errors =validationResult (req);
        if(!errors.isEmpty()){
            const errorMessage=errors.errors.map((err)=>err.msg);
            return res.status(400).json({message:errorMessage});
        }

        return next();
    };
    static newAccountRules (){
        return[
            check("email","email is invalid ").trim().isEmail(),// trim function is for removing the espace before/after the email 
            check("password","password is not strong").trim().isStrongPassword(),
            check("lastName","LastName should be valid").trim().isAlpha(),// Alpha function check that there is no number in the name
            check ("gender"," Gender should be valid among male,female,other,not-say"
            )
            .trim()
            .isIn(["male","female","other","not-say"]),
        ];
    }
     
    static newAccountTourRules(){
        return [
            check("title","title is invalid").trim().isAlpha(),
            check("seats","seats should be number").trim().isNumeric(),
            check("available","available seats should be numbers").trim().isNumeric(),
            check("dateScheduled","Date should be valid").trim().isDate(),
            check("dueDate","Due Date should be valid").trim().isDate(),
            check("price","Price is invalid").trim().isNumeric(),
            
        ];
    }

}
export default Validator;