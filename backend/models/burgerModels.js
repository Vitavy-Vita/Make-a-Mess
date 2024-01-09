import mongoose from "mongoose";

const burgerSchema = new mongoose.Schema({
  name: String,
  description: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  calories: Number,
  image: {
    src: String,
    alt: String,
  },
});

const Burger = mongoose.model("Burger", burgerSchema);

export default Burger;
