import User from "../models/usersModels.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import fs from "fs";

dotenv.config();

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Unable to get users list",
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    // never return password to the front
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error has occured",
    });
  }
};

export const register = async (req, res) => {
  try {
    const checkPwd =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;
    const checkNameLength = /^.{1,10}$/;
    const checkSpecialCharacters =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const checkEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const checkTel = /^06\d{8}$/;
    const { name, password, passwordConfirm, tel, email } = req.body;

    if (
      name.trim() === "" ||
      password.trim() === "" ||
      passwordConfirm.trim() === "" ||
      tel.trim() === "" ||
      email.trim() === ""
    ) {
      return res.status(401).json({
        status: "error",
        message: "Please provide all informations",
      });
    }
    const verifEmail = await User.findOne({
      email,
    });
    if (verifEmail) {
      return res.status(401).json({
        message: "This email is already taken",
      });
    }
    if (!checkEmail.test(email)) {
      return res.status(401).json({
        message: "Email format incorrect",
      });
    }
    if (!checkPwd.test(password)) {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }
    if (password !== passwordConfirm) {
      return res.status(401).json({
        status: "error",
        message: "Passwords do not match",
      });
    }
    if (!checkNameLength.test(name)) {
      return res.status(401).json({
        message: "Name must be 10 characters maximum",
      });
    }
    if (!checkSpecialCharacters.test(name)) {
      return res.status(401).json({
        message: "Name must not include special characters",
      });
    }
    if (!checkTel.test(tel)) {
      return res.status(401).json({
        message: "Please use the correct phone number format",
      });
    }
    let user;
    if (!req.file) {
      user = new User({
        name: name,
        password: password,
        passwordConfirm: passwordConfirm,
        tel: tel,
        email: email,
      });
    } else {
      user = new User({
        name: name,
        password: password,
        passwordConfirm: passwordConfirm,
        tel: tel,
        email: email,
        image: {
          src: req.file.filename,
          alt: req.file.originalname,
        },
      });
    }

    await user.save();
    res.status(200).json({
      status: "success",
      message: "User created",
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({
      message: "Unable to create new user",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValidPwd = bcrypt.compareSync(password, user.password);

    if (!isValidPwd) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_TOKEN }
    );

    res.status(200).json({
      id: user._id,
      login: user.login,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cant login",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // we gave a default profil picture to our users, but we dont want it to be removed from our directory when the user deletes his account, so we make sure of it here.
    if (deletedUser.image.src !== "default-user.png") {
      fs.unlink(`./public/assets/img/${deletedUser.image.src}`, (error) => {
        if (error) {
          return res.status(500).json({
            status: "fail",
            message: "Error deleting file",
          });
        }
      });
    }

    res.status(204).json({
      message: "Account deleted",
    });
  } catch (error) {
    console.log("Error deleting user:", error);
    res.status(500).json({
      message: "Delete not working",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const checkNameLength = /^.{1,10}$/;
    const checkSpecialCharacters =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const checkEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~\s-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const checkTel = /^06\d{8}$/;

    const { name, tel, email, role } = req.body;
   

    if (!checkEmail.test(email)) {
      return res.status(401).json({
        message: "Email format incorrect",
      });
    }

    if (!checkNameLength.test(name)) {
      return res.status(401).json({
        message: "Name must be 10 characters maximum",
      });
    }
    if (!checkSpecialCharacters.test(name)) {
      return res.status(401).json({
        message: "Name must not include special characters",
      });
    }
    if (!checkTel.test(tel)) {
      return res.status(401).json({
        message: "Please use the correct phone number format",
      });
    }

    let updateUser;
    if (role) {
      updateUser = {
        role: role,
      };
    } else if (!req.file) {
      updateUser = {
        name: name,
        tel: tel,
        email: email,

      };
    } else {
      updateUser = {
        image: {
          src: req.file.filename,
          alt: req.file.originalname,
        },
        name: name,
        tel: tel,
        email: email,

      };
    }

    if (req.file) {
      const getOldFile = await User.findById(req.params.id);
      // handling cleaning of directory:
      // if there is an old file, we use unlink method.
      if (getOldFile.image.src) {
        // unlink takes path and a callback, path being the old file and here the callback is the error handler.
        if (getOldFile.image.src !== "default-user.png") {
          fs.unlink(`./public/assets/img/${getOldFile.image.src}`, (err) => {
            if (err) {
              return res.status(500).json({
                message: "Error deleting old image file",
              });
            }
            // returning a success status here would cause a crash, because if we've passed that check, it means it worked and we're already handling that case just below, so no repeat.
          });
        }
      }
    }

    await User.findOneAndUpdate({ _id: req.params.id }, updateUser);

    res.status(201).json({
      message: "Updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Could not update",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;

  const checkPwd =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

  if (!checkPwd.test(password)) {
    return res.status(401).json({
      message: "Email format incorrect",
    });
  }
  try {
    const newPassword = await bcrypt.hash(password, 10);
    // according to the email of the user, we're looking into changing only the password.
    const user = await User.updateOne({ email }, { password: newPassword });

    if (!user) {
      return res.status(404).json({
        message: "Invalid or expired token.",
      });
    }

    res.status(200).json({
      message: "Password reset successful.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
