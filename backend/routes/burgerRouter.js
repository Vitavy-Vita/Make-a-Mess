import express from "express";
import {
  addBurger,
  deleteBurger,
  getAllBurgers,
  getOneBurger,
  updateBurger,
} from "../controllers/burgerController.js";
import upload from "../middlewares/multer.js";

const burgerRouter = express.Router();

burgerRouter.route("/burgers").get(getAllBurgers);
burgerRouter
  .route("/burgers/:id")
  .get(upload.single("image"), getOneBurger)
  .delete(deleteBurger)
  .put(upload.single("image"), updateBurger);
burgerRouter.route("/burgers/new").post(upload.single("image"), addBurger);

export default burgerRouter;
