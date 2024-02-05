import express from "express";
import { email, passwordRecovery } from "../controllers/emailsController.js";

const emailRouter = express.Router();

emailRouter.route("/send").post(email);
emailRouter.route("/send/recovery-email/otp").post(passwordRecovery)
export default emailRouter;
