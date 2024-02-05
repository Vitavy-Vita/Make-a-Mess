import { Topping } from "../models/customBurgersModels.js";

export const getAllTopping = async (_, res) => {
    try {
      const topping = await Topping.find();
      res.status(200).json(topping);
    } catch (error) {
      res.status(500).json({
        status: error,
        message: "Unable to get topping list",
      });
    }
  };
  
  export const getOneTopping = async (req, res) => {
    try {
      const { id } = req.params;
      const topping = await Topping.findById(id);
  
      if (!topping) {
        return res.status(404).json({
          status: "error",
          message: "Topping not found",
        });
      } else {
        res.status(200).json(topping);
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "An error has occured",
      });
    }
  };
  
  export const addTopping = async (req, res) => {
    try {
      const { name, protein, carbs, fat, calories } = req.body;
      if (
        name.trim() === "" ||
        protein < 0 ||
        carbs < 0 ||
        fat < 0 ||
        calories < 0
      ) {
        return res
          .status(401)
          .json({ message: "It seems you forgot a blank space somewhere !" });
      }
      const topping = new Topping({
        name: name,
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        calories: parseFloat(calories),
      });
      await topping.save();
      res.status(200).json({
        message: "Topping created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Unable to create a new topping",
      });
    }
  };
  
  export const updateTopping = async (req, res) => {
    try {
      const { name, protein, carbs, fat, calories } = req.body;
      if (
        name.trim() === "" ||
        protein < 0 ||
        carbs < 0 ||
        fat < 0 ||
        calories < 0
      ) {
        return res
          .status(401)
          .json({ message: "It seems you forgot a blank space somewhere !" });
      }
      const updateTopping = {
        name: name,
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        calories: parseFloat(calories),
      };
      await Topping.findByIdAndUpdate(req.params.id, updateTopping);
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
  
  export const deleteTopping = async (req, res) => {
    try {
      await Topping.findByIdAndDelete(req.params.id).then(() => {
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