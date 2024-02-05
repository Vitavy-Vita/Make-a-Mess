import express from "express";
import {
  addBurger,
  deleteBurger,
  getAllBurgers,
  getOneBurger,
  updateBurger,
} from "../controllers/burgersController.js";
import upload from "../middlewares/multer.js";
import { isLogged, isAuthorized } from "../middlewares/auth.js";

const burgerRouter = express.Router();

burgerRouter.route("/burgers").get(getAllBurgers);

burgerRouter
  .route("/burgers/:id")
  .get(upload.single("image"), getOneBurger)
  .delete(isLogged, isAuthorized(["admin"]), deleteBurger)
  .put(isLogged, isAuthorized(["admin"]), upload.single("image"), updateBurger);

burgerRouter
  .route("/burgers/new")
  .post(isLogged, isAuthorized(["admin"]), upload.single("image"), addBurger);

export default burgerRouter;
