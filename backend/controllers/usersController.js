import User from "../models/usersModels.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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
    const user = await User.findById(id);

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
    const checkSpecialCharacters =/^[a-zA-Z0-9_]*$/ ;
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
    if (!checkPwd.test(password)) {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }
    if (!checkNameLength.test(name)) {
      return res.status(401).json({
        message: "Name must be 10 characters maximum",
      });
    }
    if (!checkSpecialCharacters.test(name)){
      return res.status(401).json({
        message:'Name must not include special characters'
      })
    }
    if (password !== passwordConfirm) {
      return res.status(401).json({
        status: "error",
        message:
          "Passwords do not match",
      });
    }
let user;
if(!req.file){
  user = new User({
   name: name,
   password: password,
   passwordConfirm: passwordConfirm,
   tel: tel,
   email: email,
   image:{
    src:"",
    alt:"",
   } 
 }) 
} else {
  user = new User({
   name: name,
   password: password,
   passwordConfirm: passwordConfirm,
   tel: tel,
   email: email,
   image:{
    src:req.file.filename,
    alt:req.file.originalname,
   } 
 }) 
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
    if (!email) {
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
    console.log(error);
    res.status(500).json({
      message: "Cant login",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id).then((res) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Delete not working",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = req.body;
    const updateUser = {
      name: user.name,
      password: user.password,
      tel: user.tel,
      email: user.email,
    };
    await User.findByIdAndUpdate(req.params.id, updateUser);
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
