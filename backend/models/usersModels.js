import mongoose from "mongoose";

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be 8 characters minimum"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    // validate: {
    //   validator: (el) => {
    //     return el === this.password;
    //   },
    //   message: "Password and password confirmation do not match.",
    // },
  },
  tel: {
    type: String,
    required: true,
    // unique: true,
    // validate: {
    //   validator: (phoneNumber) => {
    //     return /^06\d{8}$/.test(phoneNumber);
    //   },
    //   message: "Invalid phone number.",
    // },
    // default: "",
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    required: true,
    // validate: [validateEmail, "Please fill a valid email address"],
    // match: [
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //   "Please fill a valid email address",
    // ],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
