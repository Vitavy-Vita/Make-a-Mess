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

export const addBurger = async (req, res) => {
    try {
      const { name, description, protein, carbs, fat, calories } = req.body;
      if (
        name.trim() === "" ||
        description.trim() === "" ||
        protein.trim() === "" ||
        carbs.trim() === "" ||
        fat.trim() === "" ||
        calories.trim() === "" 
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
      res.status(500).json({
        message: "Unable to create a new article",
      });
    }
  };