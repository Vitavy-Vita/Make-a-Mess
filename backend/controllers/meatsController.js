import { Meat } from "../models/customBurgersModels.js";

export const getAllMeat = async (_, res) => {
  try {
    const meat = await Meat.find();
    res.status(200).json(meat);
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Unable to get meat list",
    });
  }
};

export const getOneMeat = async (req, res) => {
  try {
    const { id } = req.params;
    const meat = await Meat.findById(id);

    if (!meat) {
      return res.status(404).json({
        status: "error",
        message: "Meat not found",
      });
    } else {
      res.status(200).json(meat);
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error has occured",
    });
  }
};

export const addMeat = async (req, res) => {
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
    const meat = new Meat({
      name: name,
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
    });
    await meat.save();
    res.status(200).json({
      message: "Meat created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create a new meat",
    });
  }
};

export const updateMeat = async (req, res) => {
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
    const updateMeat = {
      name: name,
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
    };
    await Meat.findByIdAndUpdate(req.params.id, updateMeat);
    res.status(201).json({
      message: "Updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update",
    });
  }
};

export const deleteMeat = async (req, res) => {
  try {
    await Meat.findByIdAndDelete(req.params.id).then(() => {
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
