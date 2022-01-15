import TourInfos from "../models/tours";

class TourController{
      
    //create tour in db

    static async createTours(req,res){
        req.body.user=req.user._id;
        const tour= await TourInfos.create(req.body); // return generated data

        if(!tour){
            return res.status(404).json({error:"user not registered"})
        }

        return res
        .status(200)
        .json({message:"Tour created successfully" , data: tour});

    }
    //get all tours
    static async getAllTours(req,res){
        const tours= await TourInfos.find(); // await is a promise f(x) and is used for asynclonias fonction, async function are function that hold promises function

        if(!tours){
            return res.status(404).json({error:"no tours registered"})
        }

        return res
        .status(200)
        .json({message:"Successfully retrieved Tours" , data: tours});

    }
    //get One Tour
    static async getOneTour(req,res){
        const tour= await TourInfos.findById(req.params.id); // the await can't be running without an async function
        if(!tour){
            return res
            .status(404)
            .json({error:"no tour registered"})
        }

        return res
        .status(200)
        .json({message:"Successfully retrieved One Tour" , data: tour});

    }
     //delete One Tour
     static async deleteOneTour(req,res){
        const tour= await TourInfos.findByIdAndDelete(req.params.id); // return generated data

        if(!tour){
            return res
            .status(404)
            .json({error:"no tour registered"})
        }

        return res
        .status(200)
        .json({message:"Successfully deleted One Tour" , data: tour});

    }

}
export default TourController;