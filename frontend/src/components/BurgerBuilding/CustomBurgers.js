import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomBurgers = () => {
  const [breadToOpen, setBreadToOpen] = useState(false);
  const [meatToOpen, setMeatToOpen] = useState(false);
  const [cheeseToOpen, setCheeseToOpen] = useState(false);
  const [sauceToOpen, setSauceToOpen] = useState(false);
  const [toppingToOpen, setToppingToOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [err, setErr] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const [totalMacros, setTotalMacros] = useState({
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
  });

  useEffect(() => {
    calculateTotal();
    // deleteIngredient();
    axios
      .get(`http://localhost:9001/ingredients`)
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, [toggle]);

  const handleClick = (i, name) => {
    setSelectedIngredient([...selectedIngredient, ingredients[name][i]]);
    console.log(selectedIngredient);
    const newI = ingredients[name].filter(
      (ing) => ing._id == selectedIngredient[i]._id
    );

    setIngredients({ ...ingredients, [name]: newI });
    calculateTotal();
  };

  const calculateTotal = () => {
    const newTotalCombine = selectedIngredient.reduce(
      (acc, macros) => {
        acc.protein += macros.protein;
        acc.carbs += macros.carbs;
        acc.fat += macros.fat;
        acc.calories += macros.calories;
        return acc;
      },
      {
        protein: 0,
        carbs: 0,
        fat: 0,
        calories: 0,
      }
    );

    setTotalMacros(newTotalCombine);
  };
  const handleDelete = (i, name) => {
    // const newArray = [...selectedIngredient[i]];
    selectedIngredient.splice(i, 1);
    console.log(ingredients);
    setToggle(true);
    console.log(selectedIngredient);
    console.log("ingredients:" + ingredients[name][i]);

    // ingredients[name].splice(i,1)
    //  console.log( );

    //  setIngredients({bread: newIng})
    calculateTotal();

    // setSelectedIngredient([...selectedIngredient, ingredients[name][i]]);
    // deleteIngredient();
  };
  const deleteIngredient = () => {
    const newTotalCombine = selectedIngredient.reduce(
      (acc, macros) => {
        acc.protein -= macros.protein;
        acc.carbs -= macros.carbs;
        acc.fat -= macros.fat;
        acc.calories -= macros.calories;
        return acc;
      },
      {
        protein: 0,
        carbs: 0,
        fat: 0,
        calories: 0,
      }
    );

    setTotalMacros(newTotalCombine);
  };

  return (
    <main className="custom-main">
      <section className="custom-container">
        <h2 onClick={() => setBreadToOpen(!breadToOpen)}>
          <span className={"cross-minus"}></span>
          <motion.span
            initial={false}
            animate={{
              opacity: breadToOpen ? 0 : 1,
            }}
            className={"cross-plus"}
          ></motion.span>
          Select your bread
          <span className={"emoji"}>🍔</span>
        </h2>
        <motion.section
          initial={false}
          animate={{
            height: breadToOpen ? "auto" : 0,
          }}
        >
          {ingredients.bread && (
            <motion.article
              initial={false}
              animate={{
                opacity: breadToOpen ? 1 : 0,
              }}
            >
              {ingredients.bread.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "bread")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li onClick={() => handleDelete(i, "bread")}>❌</li>
                    <li>Fat:</li>
                    <li>{ingredient.fat}</li>
                    <li>Calories:</li>
                    <li>{ingredient.calories}</li>
                  </ul>
                </aside>
              ))}
            </motion.article>
          )}
        </motion.section>
        <h2 onClick={() => setMeatToOpen(!meatToOpen)}>
          <span className={"cross-minus"}></span>{" "}
          <motion.span
            className={"cross-plus"}
            initial={false}
            animate={{
              opacity: meatToOpen ? 0 : 1,
            }}
          ></motion.span>
          Select your protein <span className={"emoji"}>🥩</span>
        </h2>
        <motion.section
          initial={false}
          animate={{
            height: meatToOpen ? "auto" : 0,
          }}
        >
          {ingredients.meat && (
            <motion.article
              initial={false}
              animate={{
                opacity: meatToOpen ? 1 : 0,
              }}
            >
              {ingredients.meat.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "meat")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li>❌</li>
                    <li>Fat:</li>
                    <li>{ingredient.fat}</li>
                    <li>Calories:</li>
                    <li>{ingredient.calories}</li>
                  </ul>
                </aside>
              ))}
            </motion.article>
          )}
        </motion.section>
        <h2 onClick={() => setCheeseToOpen(!cheeseToOpen)}>
          <span className={"cross-minus"}></span>{" "}
          <motion.span
            className={"cross-plus"}
            initial={false}
            animate={{
              opacity: cheeseToOpen ? 0 : 1,
            }}
          ></motion.span>
          Select your Cheese <span className={"emoji"}>🧀</span>
        </h2>
        <motion.section
          initial={false}
          animate={{
            height: cheeseToOpen ? "auto" : 0,
          }}
        >
          {ingredients.cheese && (
            <motion.article
              initial={false}
              animate={{
                opacity: cheeseToOpen ? 1 : 0,
              }}
            >
              {ingredients.cheese.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "cheese")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li>❌</li>
                    <li>Fat:</li>
                    <li>{ingredient.fat}</li>
                    <li>Calories:</li>
                    <li>{ingredient.calories}</li>
                  </ul>
                </aside>
              ))}
            </motion.article>
          )}
        </motion.section>
        <h2 onClick={() => setToppingToOpen(!toppingToOpen)}>
          <span className={"cross-minus"}></span>{" "}
          <motion.span
            className={"cross-plus"}
            initial={false}
            animate={{
              opacity: toppingToOpen ? 0 : 1,
            }}
          ></motion.span>
          Select your topping <span className={"emoji"}>🥗</span>
        </h2>
        <motion.section
          initial={false}
          animate={{
            height: toppingToOpen ? "auto" : 0,
          }}
        >
          {ingredients.topping && (
            <motion.article
              initial={false}
              animate={{
                opacity: toppingToOpen ? 1 : 0,
              }}
            >
              {ingredients.topping.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "topping")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li>❌</li>
                    <li>Fat:</li>
                    <li>{ingredient.fat}</li>
                    <li>Calories:</li>
                    <li>{ingredient.calories}</li>
                  </ul>
                </aside>
              ))}
            </motion.article>
          )}
        </motion.section>
        <h2 onClick={() => setSauceToOpen(!sauceToOpen)}>
          <span className={"cross-minus"}></span>
          <motion.span
            className={"cross-plus"}
            initial={false}
            animate={{
              opacity: sauceToOpen ? 0 : 1,
            }}
          ></motion.span>
          Select your sauce
          <span className={"emoji"}>🥫</span>
        </h2>
        <motion.section
          initial={false}
          animate={{
            height: sauceToOpen ? "auto" : 0,
          }}
        >
          {ingredients.sauce && (
            <motion.article
              initial={false}
              animate={{
                opacity: sauceToOpen ? 1 : 0,
              }}
            >
              {ingredients.sauce.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "sauce")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li>❌</li>
                    <li>Fat:</li>
                    <li>{ingredient.fat}</li>
                    <li>Calories:</li>
                    <li>{ingredient.calories}</li>
                  </ul>
                </aside>
              ))}
            </motion.article>
          )}
        </motion.section>
      </section>
      <section className="ingredient-total">
        <h2>Thats a great burger you just made !</h2>
        <ul className="ingredient-list">
          <li>Protein:</li>
          <li>{totalMacros.protein}</li>
          <li>Carbs:</li>
          <li>{totalMacros.carbs}</li>
          <li>Fat:</li>
          <li>{totalMacros.fat}</li>
          <li>Calories:</li>
          <li>{totalMacros.calories}</li>
        </ul>
      </section>
    </main>
  );
};

export default CustomBurgers;
