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
  updateBread,
  updateCheese,
  updateMeat,
  updateSauce,
  updateTopping,
} from "../controllers/customBurgersController.js";
import { isAuthorized, isLogged } from "../middlewares/auth.js";

const customBurgers = express.Router();

customBurgers
  .route("/custom/bread/new")
  .post(isLogged, isAuthorized(["admin"]), addBread);
customBurgers.route("/custom/bread").get(getAllBread);
customBurgers
  .route("/custom/bread/:id")
  .get(getOneBread)
  .delete(isLogged, isAuthorized(["admin"]), deleteBread)
  .put(isLogged, isAuthorized(["admin"]), updateBread);

const customMeat = express.Router();

customMeat
  .route("/custom/meat/new")
  .post(isLogged, isAuthorized(["admin"]), addMeat);
customMeat.route("/custom/meat").get(getAllMeat);
customMeat
  .route("/custom/meat/:id")
  .get(getOneMeat)
  .delete(isLogged, isAuthorized(["admin"]), deleteMeat)
  .put(isLogged, isAuthorized(["admin"]), updateMeat);

const customCheese = express.Router();

customCheese
  .route("/custom/cheese/new")
  .post(isLogged, isAuthorized(["admin"]), addCheese);
customCheese.route("/custom/cheese").get(getAllCheese);
customCheese
  .route("/custom/cheese/:id")
  .get(getOneCheese)
  .delete(isLogged, isAuthorized(["admin"]), deleteCheese)
  .put(isLogged, isAuthorized(["admin"]), updateCheese);

const customSauce = express.Router();

customSauce
  .route("/custom/sauce/new")
  .post(isLogged, isAuthorized(["admin"]), addSauce);
customSauce.route("/custom/sauce").get(getAllSauce);
customSauce
  .route("/custom/sauce/:id")
  .get(getOneSauce)
  .delete(isLogged, isAuthorized(["admin"]), deleteSauce)
  .put(isLogged, isAuthorized(["admin"]), updateSauce);

const customTopping = express.Router();

customTopping
  .route("/custom/topping/new")
  .post(isLogged, isAuthorized(["admin"]), addTopping);
customTopping.route("/custom/topping").get(getAllTopping);
customTopping
  .route("/custom/topping/:id")
  .get(getOneTopping)
  .delete(isLogged, isAuthorized(["admin"]), deleteTopping)
  .put(isLogged, isAuthorized(["admin"]), updateTopping);

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
