import Burger from "../models/burgerModels.js";

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
      return res.status(401).json({ message: "Please provide all fields" });
    }
    let burger;
    if (!req.file) {
      burger = new Burger({
        name: name,
        description: description,
        protein: protein,
        carbs: carbs,
        fat: fat,
        calories: calories,
        image: {
          src: "",
          alt: "",
        },
      });
    } else {
      burger = new Burger({
        name: name,
        description: description,
        protein: protein,
        carbs: carbs,
        fat: fat,
        calories: calories,
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
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({
      message: "Unable to create a new burger",
    });
  }
};
