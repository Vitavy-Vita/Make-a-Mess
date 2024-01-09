import express from "express";
import { addBurger, getAllBurgers } from "../controllers/burgerController.js";


const burgerRouter = express.Router();

burgerRouter.route("/burgers").get(getAllBurgers);
burgerRouter.route("/burgers/new").post(addBurger);

export default burgerRouter;
