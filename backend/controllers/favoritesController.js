import { Favorites } from "../models/customBurgersModels.js";

export const getAllFavorites = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        status: "error",
        message: "User not authenticated",
      });
    }

    const userId = req.userId;
    const favorite = await Favorites.find({ user: userId });
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Unable to get favorite list",
    });
  }
};

export const getOneFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const favorite = await Favorites.findById(id);

    if (!favorite) {
      return res.status(404).json({
        status: "error",
        message: "Favorite not found",
      });
    } else {
      res.status(200).json(favorite);
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error has occured",
    });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { name, protein, carbs, fat, calories, ingredients } = req.body;
    const verifName =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (!verifName.test(name)) {
      return res.status(401).json({
        message: "Numbers are not allowed",
      });
    }
    if (protein <= 0 || carbs <= 0 || fat <= 0 || calories <= 0) {
      return res
        .status(401)
        .json({ message: "Make sure to select all ingredients !" });
    }

    const favorite = new Favorites({
      user: req.userId,
      name,
      ingredients: ingredients.join(", "),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
      date: new Date(),
    });

    await favorite.save();
    res.status(200).json({
      message: "Favorite saved",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save to favorites",
    });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    await Favorites.findByIdAndDelete(req.params.id).then(() => {
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
