import User from "../models/usersModels.js";

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Enable to get users list",
    });
  }
};

export const addUsers = async (req, res) => {
  try {
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
    const user = new User({
      name: name,
      password: password,
      passwordConfirm: passwordConfirm,
      tel: tel,
      email: email,
    });
    await user.save();
    res.status(200).json({
      status: "success",
      message: "User created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Enable to create new user",
    });
  }
};
