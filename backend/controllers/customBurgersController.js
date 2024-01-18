import {
  Bread,
  Meat,
  Sauce,
  Topping,
  Cheese,
} from "../models/customBurgersModels.js";

export const getAllBread = async (req, res) => {
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
    if (
      name.trim() === "" ||
      protein <= 0 ||
      carbs <= 0 ||
      fat <= 0 ||
      calories <= 0
    ) {
      return res.status(401).json({ message: "Please provide all fields" });
    }
    const bread = new Bread({
      name: name,
      protein: protein,
      carbs: carbs,
      fat: fat,
      calories: calories,
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

export const deleteBread = async (req, res) => {
  try {
    await Bread.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Delete not working",
    });
  }
};

export const getAllMeat = async (req, res) => {
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
      protein <= 0 ||
      carbs <= 0 ||
      fat <= 0 ||
      calories <= 0
    ) {
      return res.status(401).json({ message: "Please provide all fields" });
    }
    const meat = new Meat({
      name: name,
      protein: protein,
      carbs: carbs,
      fat: fat,
      calories: calories,
    });
    await meat.save();
    res.status(200).json({
      message: "Meat created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to create a new meat",
    });
  }
};

export const deleteMeat = async (req, res) => {
  try {
    await Meat.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Delete not working",
    });
  }
};

export const getAllCheese = async (req, res) => {
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
      protein <= 0 ||
      carbs <= 0 ||
      fat <= 0 ||
      calories <= 0
    ) {
      return res.status(401).json({ message: "Please provide all fields" });
    }
    const cheese = new Cheese({
      name: name,
      protein: protein,
      carbs: carbs,
      fat: fat,
      calories: calories,
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

export const deleteCheese = async (req, res) => {
  try {
    await Cheese.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Delete not working",
    });
  }
};

export const getAllSauce = async (req, res) => {
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
      protein <= 0 ||
      carbs <= 0 ||
      fat <= 0 ||
      calories <= 0
    ) {
      return res.status(401).json({ message: "Please provide all fields" });
    }
    const sauce = new Sauce({
      name: name,
      protein: protein,
      carbs: carbs,
      fat: fat,
      calories: calories,
    });
    await sauce.save();
    res.status(200).json({
      message: "Sauce created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to create a new sauce",
    });
  }
};

export const deleteSauce = async (req, res) => {
  try {
    await Sauce.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Delete not working",
    });
  }
};

export const getAllTopping = async (req, res) => {
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
      protein <= 0 ||
      carbs <= 0 ||
      fat <= 0 ||
      calories <= 0
    ) {
      return res.status(401).json({ message: "Please provide all fields" });
    }
    const topping = new Topping({
      name: name,
      protein: protein,
      carbs: carbs,
      fat: fat,
      calories: calories,
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

export const deleteTopping = async (req, res) => {
  try {
    await Topping.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Delete not working",
    });
  }
};
export const getAllIngredients = async (req, res) => {
  try {
    const topping = await Topping.find();
    const meat = await Meat.find();
    const cheese = await Cheese.find();
    const bread = await Bread.find();
    const sauce = await Sauce.find();
    res.status(200).json({topping, meat, cheese, sauce, bread});
  } catch (error) {
    res.status(500).json({
      status: error,
      message: "Unable to get topping list",
    });
  }
};
