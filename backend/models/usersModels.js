import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [10, "Nickname must be 10 characters maximum"],
    validate: {
      validator: (specialChar) => {
        return /^[a-zA-Z0-9_]*$/.test(specialChar);
      },
      validator: (length) => {
        return /^.{1,10}$/.test(length);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be 8 characters minimum"],
    validate: {
      validator: (password) => {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/.test(
          password
        );
      },
      message: "Invalid password.",
    },
  },
  tel: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (phoneNumber) => {
        return /^06\d{8}$/.test(phoneNumber);
      },
      message: "Invalid phone number.",
    },
    default: "",
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: (email) => {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          email
        );
      },
      message: "Please fill a valid email address",
    },
  },
  image: {
    src: {
      type: String,
      default: "default-user.png",
      required: true,
    },
    alt: {
      type: String,
      default: "default user",
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
});

// Crypting or "hashing" user password when the account is created
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // salting is the methode used to amplify security, rendering the password chosen by the user to a random selection of characters, here set to 10.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-hook to make sure that when the user change its password it stays crypted
// with the .pre hook findByIdAndUpdate doesnt exist on its own but is include in findOneAndUpdate; 
userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    // find one user, here getQuery() returns a query object, in Mongoose that object contains key-values in pairs that we can now access.
    const userToUpdate = await User.findOne(this.getQuery());
    const salt = await bcrypt.genSalt(10);
    let newPassword = await bcrypt.hash(userToUpdate.password, salt);
    // we decide here to modify this specific key-value pair to replace old paswword with newPassword
    this.set({ password: newPassword });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
