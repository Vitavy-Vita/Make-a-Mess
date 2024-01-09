import mongoose from "mongoose";

const burgerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  image: {
    src: String,
    alt: String,
  },
});

const Burger = mongoose.model("Burger", burgerSchema);

export default Burger;
