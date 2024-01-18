import express from "express";
import {
  register,
  login,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
} from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.route("/users").get(getAllUsers);
userRouter.route("/users/:id").get(getOneUser).delete(deleteUser);
userRouter.route("/users/:id/update").put(updateUser);
userRouter.route("/users/register").post(register);
userRouter.route("/users/login").post(login);

export default userRouter;
