import { Bread } from "../models/customBurgersModels.js";

export const getAllBread = async (_, res) => {
  try {
    const bread = await Bread.find();
    res.status(200).json(bread);
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Unable to get bread list",
    });
  }
};

export const getOneBread = async (req, res) => {
  try {
    const { id } = req.params;
    const bread = await Bread.findById(id);

    if (!bread) {
      return res.status(404).json({
        status: "error",
        message: "Bread not found",
      });
    } else {
      res.status(200).json(bread);
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error has occured",
    });
  }
};

export const addBread = async (req, res) => {
  try {
    const { name, protein, carbs, fat, calories } = req.body;
    const verifName =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (!verifName.test(name)) {
      return res.status(401).json({
        message: "Name format incorrect",
      });
    }

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
    const bread = new Bread({
      name: name,
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
    });
    await bread.save();
    res.status(200).json({
      message: "Bread created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create a new bread",
    });
  }
};

export const updateBread = async (req, res) => {
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
    const updateBread = {
      name: name,
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      calories: parseFloat(calories),
    };
    await Bread.findByIdAndUpdate(req.params.id, updateBread);
    res.status(201).json({
      message: "Updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update",
    });
  }
};

export const deleteBread = async (req, res) => {
  try {
    await Bread.findByIdAndDelete(req.params.id).then(() => {
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
