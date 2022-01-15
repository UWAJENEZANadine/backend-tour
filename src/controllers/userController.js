
import UserInfos from "../models/user";
import BookInfos from "../models/book"
import TourInfos from "../models/tours"
import TokenAuth from "../helpers/tokenAuth";
import bcrypt from "bcrypt";

class UserController {
  	

 //Create user in db
  //Create user in db

 

  static async createUser(req, res) {

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPassword;
    const user = await UserInfos.create(req.body);
    if (!user) {

      return res.status(404).json({ error: "user not registered" });

    }

    return res

      .status(200)

      .json({ message: "User created successfully", data: user });

  }
 //get all users
 static async getAllUsers(req,res){ //
  const users= await UserInfos.find(); // return generated data

  if(!users){
      return res.status(404).json({error:"no users registered"})
  }

  return res
  .status(200)
  .json({message:"Successfully retrieved users" , data: users});

}
 //getting a specific user
 static async getOneUser(req,res){

  const user= await UserInfos.findById(req.params.id); //this functions return the data yabonye according to the id given
   
  if(!user){
      return res.status(404).json({error:"user not found"});
  }
  return res
  .status(200)
  .json({message:"user found successful", data:user})

}
  // delete a user
  static async deleteOneUser(req,res){

    const user= await UserInfos.findByIdAndDelete(req.params.id); //this functions return the data yabonye according to the id given
     
    if(!user){
        return res.status(404).json({error:"user not found"});
    }
    return res
    .status(200)
    .json({message:"user deleted successful", data:user})

  }
  static async userLogin(req, res) {

    const user = await UserInfos.findOne({ email: req.body.email });

    if (!user) {

      return res
        .status(404)
        .json({ error: "email not found! kindly register first" });

    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      user.password = null;
      const token = TokenAuth.tokenGenerator({ user: user });

      return res
        .status(200)
        .json({ message: "succefully logged in", token: token,data:user });

    }
    return res.status(400).json({ error: "Password is wrong" });

  }
//Bookking functions

 

static async bookTour(req, res) {

  const bookData = {
    user: req.user._id,
    tour: req.params.id,

  };
  const book = await BookInfos.create(bookData);
  const tour = await TourInfos.findById(req.params.id);
  if (!book) {

    return res.status(404).json({ error: "failed to book" });

  }
  return res.status(200).json({ message: "Booked successfully", data: book });

}

//get all Bookes

static async getAllBookings(req, res) {

  const books = await BookInfos.find();
  if (!books) {

    return res.status(404).json({ error: "Book Not found" });

  }
  return res.status(200).json({ message: "Success", data: books });

}

// get all booking by user

static async getAllBookingsByUser(req, res) {

  // console.log(req.user)

  const books = await BookInfos.find({ user: req.user._id });
  if (!books) {

    return res.status(404).json({ error: "Book Not found" });

  }
  return res.status(200).json({ message: "Success", data: books });
}


// get all booking  by tour id
static async getAllBookingsByTourId(req, res) {
  const books = await BookInfos.find({ tour: req.params.idtour });

  if (!books) {

    return res.status(404).json({ error: "book not found" });

  }

  return res.status(200).json({ message: "success", data: books });
}

//get all booking  by user id
static async getaAllBookingByUserId(req, res) {

  console.log("hey what is happening");

  const bookings = await BookInfos.find();

  if (!bookings) {

    return res.status(404).json({ error: "not found" });

  }
  return res.status(200).json({ message: "success", data: bookings });
}
  // a function which will accept/decline/cancel tour booking
  static async changeBookStatus(req,res){
    const{id,status}=req.body
    const book= await BookInfos.findByIdAndUpdate(id,{status:status},{new:true})
    if(!book){
        return res.status(404).json({error:"failed to update status"});
    }
    sendSms(
        book.user.lastName,
        book.tour.title,
        book.status,
        book._id,
        book.user.phone);
    return res.status(200).json({message:"success", data:book});
}
  }

export default UserController;

// controller is the one directlly connected on database
// controller is where all the action are done
//is a class beacuse its hold different function
  	

