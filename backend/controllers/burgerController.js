import Burger from "../models/burgerModels.js";
import fs from "fs";
export const getAllBurgers = async (req, res) => {
  try {
    const burgers = await Burger.find();
    res.status(200).json(burgers);
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Unable to get burger list",
    });
  }
};

export const getOneBurger = async (req, res) => {
  try {
    const { id } = req.params;
    const burger = await Burger.findById(id);

    if (!burger) {
      return res.status(404).json({
        status: "error",
        message: "Burger not found",
      });
    } else {
      res.status(200).json(burger);
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error has occured",
    });
  }
};

export const addBurger = async (req, res) => {
  try {
    const { name, description, protein, carbs, fat, calories } = req.body;
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      protein <= 0 ||
      carbs <= 0 ||
      fat <= 0 ||
      calories <= 0
    ) {
      return res
        .status(401)
        .json({ message: "It seems you forgot a blank space somewhere !" });
    }
    let burger;
    if (!req.file) {
      burger = new Burger({
        name: name,
        description: description,
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        calories: parseFloat(calories),
        image: {
          src: "",
          alt: "",
        },
      });
    } else {
      burger = new Burger({
        name: name,
        description: description,
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        calories: parseFloat(calories),
        image: {
          src: req.file.filename,
          alt: req.file.originalname,
        },
      });
    }
    await burger.save();

    res.status(200).json({
      message: "Burger created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create a new burger",
    });
  }
};

export const updateBurger = async (req, res) => {
  try {
    const { name, description, protein, carbs, fat, calories } = req.body;
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      protein <= 0 ||
      carbs <= 0 ||
      fat <= 0 ||
      calories <= 0
    ) {
      return res.status(401).json({ message: "Please provide all fields" });
    }
    let updateBurger;
    if (!req.file) {
      updateBurger = {
        image: {
          src: "",
          alt: "",
        },
        name: name,
        description: description,
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        calories: parseFloat(calories),
      };
    } else {
      updateBurger = {
        image: {
          src: req.file.filename,
          alt: req.file.originalname,
        },
        name: name,
        description: description,
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        calories: parseFloat(calories),
      };
    }
    await Burger.findByIdAndUpdate(req.params.id, updateBurger);
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

export const deleteBurger = async (req, res) => {
  try {
    const deletedBurger = await Burger.findByIdAndDelete(req.params.id);
    fs.unlink(`./public/assets/img/${deletedBurger.image.src}`, (error) => {
      if (error) {
        res.status(500).json({
          status: "fail",
          message: "Error deleting file",
        });
      }
    });
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Delete not working",
    });
  }
};
