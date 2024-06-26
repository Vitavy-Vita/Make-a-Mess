import express from "express";
import {
  register,
  login,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  resetPassword,
} from "../controllers/usersController.js";
import upload from "../middlewares/multer.js";
import { isAuthorized, isLogged } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.route("/users").get(getAllUsers);
userRouter
  .route("/users/:id")
  .get(upload.single("image"), getOneUser)
  .delete(isLogged, isAuthorized(["admin", "user"]), deleteUser)
  .put(
    isLogged,
    isAuthorized(["admin", "user"]),
    upload.single("image"),
    updateUser
  );

userRouter.route("/users/register").post(upload.single("image"), register);
userRouter.route("/users/login").post(login);
userRouter.route("/send/recovery-email/reset/:email").put(resetPassword);

export default userRouter;
