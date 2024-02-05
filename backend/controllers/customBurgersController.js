import {
  Bread,
  Meat,
  Sauce,
  Topping,
  Cheese,
  Favorites,
} from "../models/customBurgersModels.js";








export const getAllIngredients = async (_, res) => {
  try {
    const topping = await Topping.find();
    const meat = await Meat.find();
    const cheese = await Cheese.find();
    const bread = await Bread.find();
    const sauce = await Sauce.find();
    res.status(200).json({ topping, meat, cheese, sauce, bread });
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Unable to get topping list",
    });
  }
};
