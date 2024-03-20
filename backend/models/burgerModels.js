import mongoose from "mongoose";

const burgerSchema = new mongoose.Schema({
  name: String,
  description: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  calories: Number,
  image: {
    src: {
      type: String,
      default: "default-burger.png",
      required: true,
    },
    alt: {
      type: String,
      default: "default user",
      required: true,
    },
  },
});

const Burger = mongoose.model("Burger", burgerSchema);

export default Burger;
