import { Cheese } from "../models/customBurgersModels.js";

export const getAllCheese = async (_, res) => {
  try {
    const cheese = await Cheese.find();
    res.status(200).json(cheese);
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Unable to get cheese list",
    });
  }
};

export const getOneCheese = async (req, res) => {
  try {
    const { id } = req.params;
    const cheese = await Cheese.findById(id);

    if (!cheese) {
      return res.status(404).json({
        status: "error",
        message: "Cheese not found",
      });
    } else {
      res.status(200).json(cheese);
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error has occured",
    });
  }
};

export const addCheese = async (req, res) => {
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
    const cheese = new Cheese({
      name: name,
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
    });
    await cheese.save();
    res.status(200).json({
      message: "Cheese created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to create a new cheese",
    });
  }
};

export const updateCheese = async (req, res) => {
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
    const updateCheese = {
      name: name,
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
    };
    await Cheese.findByIdAndUpdate(req.params.id, updateCheese);
    res.status(201).json({
      message: "Updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update",
    });
  }
};

export const deleteCheese = async (req, res) => {
  try {
    await Cheese.findByIdAndDelete(req.params.id).then(() => {
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
