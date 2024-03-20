import mongoose from "mongoose";

const breadSchema = new mongoose.Schema({
  name: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  calories: Number,
});

const Bread = mongoose.model("Bread", breadSchema);

const cheeseSchema = new mongoose.Schema({
  name: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  calories: Number,
});

const Cheese = mongoose.model("Cheese", cheeseSchema);

const toppingSchema = new mongoose.Schema({
  name: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  calories: Number,
});

const Topping = mongoose.model("Topping", toppingSchema);

const sauceSchema = new mongoose.Schema({
  name: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  calories: Number,
});

const Sauce = mongoose.model("Sauce", sauceSchema);

const meatSchema = new mongoose.Schema({
  name: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  calories: Number,
});

const Meat = mongoose.model("Meat", meatSchema);

const favoritesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ingredients: [String],
  name: String,
  protein: Number,
  carbs: Number,
  fat: Number,
  calories: Number,
  date: Date,
});

const Favorites = mongoose.model("Favorites", favoritesSchema);
export { Bread, Cheese, Topping, Sauce, Meat, Favorites };
