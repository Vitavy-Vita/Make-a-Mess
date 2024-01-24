import express from "express";
import { email } from "../controllers/emailController.js";

const emailRouter = express.Router();

emailRouter.route("/send").post(email);

export default emailRouter;
