import express from "express";
import {
  addBurger,
  getAllBurgers,
  getOneBurger,
} from "../controllers/burgerController.js";
import upload from "../middlewares/multer.js";

const burgerRouter = express.Router();

burgerRouter.route("/burgers").get(getAllBurgers);
burgerRouter.route("/burgers/:id").get(getOneBurger);
burgerRouter.route("/burgers/new").post(upload.single("image"), addBurger);

export default burgerRouter;
