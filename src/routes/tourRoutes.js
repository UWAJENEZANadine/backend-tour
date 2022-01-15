import express from "express";
import TourController from "../controllers/tourController";
import Validator from "../middlewares/validator";
import verifyToken from "../middlewares/verifyToken";
import verifyAccess from "../middlewares/verifyAccess";

  	

const TourRouter = express.Router();
TourRouter.post("/create",
    verifyToken,
     verifyAccess("admin"),
    // Validator.newAccountTourRules(),
    // Validator.validateInput,

TourController.createTours);
TourRouter.get("/allTour", TourController.getAllTours)
TourRouter.get("/profile/:id", TourController.getOneTour)
TourRouter.delete("/profile/:id", TourController.deleteOneTour)

export default TourRouter;