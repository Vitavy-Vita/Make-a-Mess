import express from "express";
import { addUsers, getAllUsers } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.route("/users").get(getAllUsers);
userRouter.route('/user/new').post(addUsers)


export default userRouter;
