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

const customBurgersRouter = express.Router();

customBurgersRouter
  .route("/custom/bread/new")
  .post(isLogged, isAuthorized(["admin"]), addBread);
customBurgersRouter.route("/custom/bread").get(getAllBread);
customBurgersRouter
  .route("/custom/bread/:id")
  .get(getOneBread)
  .delete(isLogged, isAuthorized(["admin"]), deleteBread)
  .put(isLogged, isAuthorized(["admin"]), updateBread);

const customMeatRouter = express.Router();

customMeatRouter
  .route("/custom/meat/new")
  .post(isLogged, isAuthorized(["admin"]), addMeat);
customMeatRouter.route("/custom/meat").get(getAllMeat);
customMeatRouter
  .route("/custom/meat/:id")
  .get(getOneMeat)
  .delete(isLogged, isAuthorized(["admin"]), deleteMeat)
  .put(isLogged, isAuthorized(["admin"]), updateMeat);

const customCheeseRouter = express.Router();

customCheeseRouter
  .route("/custom/cheese/new")
  .post(isLogged, isAuthorized(["admin"]), addCheese);
customCheeseRouter.route("/custom/cheese").get(getAllCheese);
customCheeseRouter
  .route("/custom/cheese/:id")
  .get(getOneCheese)
  .delete(isLogged, isAuthorized(["admin"]), deleteCheese)
  .put(isLogged, isAuthorized(["admin"]), updateCheese);

const customSauceRouter = express.Router();

customSauceRouter
  .route("/custom/sauce/new")
  .post(isLogged, isAuthorized(["admin"]), addSauce);
customSauceRouter.route("/custom/sauce").get(getAllSauce);
customSauceRouter
  .route("/custom/sauce/:id")
  .get(getOneSauce)
  .delete(isLogged, isAuthorized(["admin"]), deleteSauce)
  .put(isLogged, isAuthorized(["admin"]), updateSauce);

const customToppingRouter = express.Router();

customToppingRouter
  .route("/custom/topping/new")
  .post(isLogged, isAuthorized(["admin"]), addTopping);
customToppingRouter.route("/custom/topping").get(getAllTopping);
customToppingRouter
  .route("/custom/topping/:id")
  .get(getOneTopping)
  .delete(isLogged, isAuthorized(["admin"]), deleteTopping)
  .put(isLogged, isAuthorized(["admin"]), updateTopping);

const allIngredientsRouter = express.Router();

allIngredientsRouter.route("/ingredients").get(getAllIngredients);

export {
  customBurgersRouter,
  customMeatRouter,
  customCheeseRouter,
  customToppingRouter,
  customSauceRouter,
  allIngredientsRouter,
};
