import express from "express";
import {
  addBread,
  addCheese,
  addMeat,
  addSauce,
  addTopping,
  deleteBread,
  deleteCheese,
  deleteMeat,
  deleteSauce,
  deleteTopping,
  getAllBread,
  getAllCheese,
  getAllIngredients,
  getAllMeat,
  getAllSauce,
  getAllTopping,
  getOneBread,
  getOneCheese,
  getOneMeat,
  getOneSauce,
  getOneTopping,
} from "../controllers/customBurgersController.js";

const customBurgers = express.Router();

customBurgers.route("/custom/bread/new").post(addBread);
customBurgers.route("/custom/bread").get(getAllBread);
customBurgers.route("/custom/bread/:id").get(getOneBread).delete(deleteBread);

const customMeat = express.Router();

customMeat.route("/custom/meat/new").post(addMeat);
customMeat.route("/custom/meat").get(getAllMeat);
customMeat.route("/custom/meat/:id").get(getOneMeat).delete(deleteMeat);

const customCheese = express.Router();

customCheese.route("/custom/cheese/new").post(addCheese);
customCheese.route("/custom/cheese").get(getAllCheese);
customCheese.route("/custom/cheese/:id").get(getOneCheese).delete(deleteCheese);

const customSauce = express.Router();

customSauce.route("/custom/sauce/new").post(addSauce);
customSauce.route("/custom/sauce").get(getAllSauce);
customSauce.route("/custom/sauce/:id").get(getOneSauce).delete(deleteSauce);

const customTopping = express.Router();

customTopping.route("/custom/topping/new").post(addTopping);
customTopping.route("/custom/topping").get(getAllTopping);
customTopping.route("/custom/topping/:id").get(getOneTopping).delete(deleteTopping);

const allIngredients = express.Router();

allIngredients.route("/ingredients").get(getAllIngredients);

export {
  customBurgers,
  customMeat,
  customCheese,
  customTopping,
  customSauce,
  allIngredients,
};
