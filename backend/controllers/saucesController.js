import { Sauce } from "../models/customBurgersModels.js";

export const getAllSauce = async (_, res) => {
  try {
    const sauce = await Sauce.find();
    res.status(200).json(sauce);
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Unable to get sauce list",
    });
  }
};

export const getOneSauce = async (req, res) => {
  try {
    const { id } = req.params;
    const sauce = await Sauce.findById(id);

    if (!sauce) {
      return res.status(404).json({
        status: "error",
        message: "Sauce not found",
      });
    } else {
      res.status(200).json(sauce);
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error has occured",
    });
  }
};

export const addSauce = async (req, res) => {
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
    const sauce = new Sauce({
      name: name,
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
    });
    await sauce.save();
    res.status(200).json({
      message: "Sauce created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create a new sauce",
    });
  }
};

export const updateSauce = async (req, res) => {
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
    const updateSauce = {
      name: name,
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
    };
    await Sauce.findByIdAndUpdate(req.params.id, updateSauce);
    res.status(201).json({
      message: "Updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update",
    });
  }
};

export const deleteSauce = async (req, res) => {
  try {
    await Sauce.findByIdAndDelete(req.params.id).then(() => {
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
