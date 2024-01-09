import express from "express";
import { addUsers, getAllUsers, getOneUser } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.route("/users").get(getAllUsers);
userRouter.route('/user/new').post(addUsers)
userRouter.route("/user/:id").get(getOneUser);

export default userRouter;
