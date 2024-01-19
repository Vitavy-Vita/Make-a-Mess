import express from "express";
import {
  register,
  login,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
} from "../controllers/usersController.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.route("/users").get(getAllUsers);
userRouter
  .route("/users/:id")
  .get(upload.single("image"), getOneUser)
  .delete(deleteUser)
  .put(upload.single("image"), updateUser);

userRouter.route("/users/register").post(upload.single("image"), register);
userRouter.route("/users/login").post(login);

export default userRouter;
