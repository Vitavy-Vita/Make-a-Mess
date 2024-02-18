import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import token from "../../context/token";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const CustomBurgers = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [breadToOpen, setBreadToOpen] = useState(false);
  const [meatToOpen, setMeatToOpen] = useState(false);
  const [cheeseToOpen, setCheeseToOpen] = useState(false);
  const [sauceToOpen, setSauceToOpen] = useState(false);
  const [toppingToOpen, setToppingToOpen] = useState(false);
  const [togglePopUp, setTogglePopUp] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [err, setErr] = useState();
  const [errName, setErrName] = useState();
  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const [favoriteIngredients, setFavoriteIngredients] = useState([]);
  const [inputs, setInputs] = useState({ name: "" });

  const [breadIng, setBreadIng] = useState([]);
  const [meatIng, setMeatIng] = useState([]);
  const [cheeseIng, setCheeseIng] = useState([]);
  const [sauceIng, setSauceIng] = useState([]);
  const [toppingIng, setToppingIng] = useState([]);

  const [totalMacros, setTotalMacros] = useState({
    userId: auth.user.id,
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
  });

  // refresh the page when loading these datas
  useEffect(() => {
    calculateTotal();
    axios
      .get(`http://localhost:9001/ingredients`)
      .then((res) => {
        setIngredients(res.data);
        setBreadIng(res.data.bread);
        setMeatIng(res.data.meat);
        setCheeseIng(res.data.cheese);
        setSauceIng(res.data.sauce);
        setToppingIng(res.data.topping);
      })
      .catch((res) => {
        navigate("*");
      });
  }, []);

  // refresh the page when an ingredient is selected
  useEffect(() => {
    calculateTotal();
  }, [selectedIngredient]);

  // function used to select any ingredient

  const handleClick = (i, name) => {
    // each type of ingredient is inside an object from their respective databases, we target them by name dynamicaly and then we go inside that Array and chose the correct ingredient thanks to its index.
    let choosenIngredient;
    let choiceArray;
    switch (name) {
      case "bread":
        choiceArray = breadIng;
        choosenIngredient = breadIng[i];
        break;
      case "meat":
        choiceArray = meatIng;
        choosenIngredient = meatIng[i];
        break;
      case "cheese":
        choiceArray = cheeseIng;
        choosenIngredient = cheeseIng[i];
        break;
      case "sauce":
        choiceArray = sauceIng;
        choosenIngredient = sauceIng[i];
        break;
      case "topping":
        choiceArray = toppingIng;
        choosenIngredient = toppingIng[i];
        break;

      default:
        break;
    }
    // quick function to make sure the user cannot choose the same ingredient multiple times: e.g. if the ingredient selected is the same id thats already selected then its a no-no.
    const isAlreadySelected = selectedIngredient.find(
      (ing) => ing._id === choosenIngredient._id
    );
    // and we use that check right here - !isAlreadySelected = is not already selected
    if (!isAlreadySelected) {
      // we spread those value and replace them by the values we're interested to use and store them in those states
      setFavoriteIngredients([...favoriteIngredients, choosenIngredient.name]);
      setSelectedIngredient([...selectedIngredient, choosenIngredient]);

      // to make sure we're now showing only the choosen ingredient, we decide to use the filter method
      const newI = choiceArray.filter(
        (ing) => ing._id === choosenIngredient._id
      );
      // once again dynamicaly with the name, storing the value in their respective states
      switch (name) {
        case "bread":
          setBreadIng(newI);
          break;
        case "meat":
          setMeatIng(newI);
          break;
        case "cheese":
          setCheeseIng(newI);
          break;
        case "sauce":
          setSauceIng(newI);
          break;
        case "topping":
          setToppingIng(newI);
          break;
        default:
          break;
      }
      // call this function to render the total each time an ingredient is selected
      calculateTotal();
    }
  };

  const calculateTotal = () => {
    // the reduce method is used to easily iterate through an object.
    // it will take two parameters, the accumulator wich will contain the initial value, and the new value that we're in this case trying to add wich is macros (selectedIngredient), and then once updated returns the accumulator.
    const newTotalCombine = selectedIngredient.reduce(
      (acc, macros) => {
        acc.protein += macros.protein;
        acc.carbs += macros.carbs;
        acc.fat += macros.fat;
        acc.calories += macros.calories;
        return acc;
      },
      // this is the initial value
      {
        protein: 0,
        carbs: 0,
        fat: 0,
        calories: 0,
      }
    );
    // we then fill our state with the results
    setTotalMacros(newTotalCombine);
  };

  const handleDelete = (i, name) => {
    // the filter method in this case, will create a new array and if the selectedIngredient has the same id, we choose to exclude it from the array
    const removeIng = selectedIngredient.filter((ing, index) => ing._id !== i);

    setSelectedIngredient(removeIng);
    setFavoriteIngredients(removeIng);
    // dynamical rendition of the new Array
    switch (name) {
      case "bread":
        setBreadIng([...ingredients.bread]);
        break;
      case "meat":
        setMeatIng([...ingredients.meat]);
        break;
      case "cheese":
        setCheeseIng([...ingredients.cheese]);
        break;
      case "sauce":
        setSauceIng([...ingredients.sauce]);
        break;
      case "topping":
        setToppingIng([...ingredients.topping]);
        break;

      default:
        break;
    }
    // call this to make sure the total is correctly update 
    calculateTotal();
  };

  const onClickToggle = () => {
    // we make sure that if the user has not selected every ingredient, he is not allowed to save to its favorites.
    // selectedIngredient being an array we make sure that as long as there is not 5 ingredients, its not possible to continue.
    if (selectedIngredient.length !== 5) {
      return setErr("You need to select all ingredients first.");
    }
    setTogglePopUp(!togglePopUp);
  };

  const handleChange = (e) => {
    setInputs({ name: e.target.value });
    setErr("");
    setErrName("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.name.trim() === "") {
      return setErrName("Name format incorrect");
    }
    // the user is able to add those burger and giving it a name to add to its favorites.
    // we need the macros datas stored in totalMacros
    // we need the name of each ingredients, being here stored in favoriteIngredient
    // the field inputs comes from the pop-up and only contains the name
    axios
      .post(
        "http://localhost:9001/favorites",
        { ...totalMacros, ingredients: favoriteIngredients, ...inputs },
        {
          headers: token(),
        }
      )
      .then((res) => {
        navigate("/my-profil");
        setTogglePopUp(!togglePopUp);
      })
      .catch((res) => {
        setErr(res.response.data.message);
        setErrName(res.response.data.message);
      });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        mass: 7,
        damping: 50,
      }}
      className="custom-main"
    >
      <section className="custom-container">
        <motion.h2
          initial={false}
          animate={{
            color: breadToOpen ? "#c85a44" : "#825b56",
          }}
          onClick={() => setBreadToOpen(!breadToOpen)}
        >
          <motion.span
            initial={false}
            animate={{
              backgroundColor: breadToOpen ? "#c85a44" : "#825b56",
            }}
            className={"cross-minus"}
          ></motion.span>
          <motion.span
            initial={false}
            animate={{
              opacity: breadToOpen ? 0 : 1,
            }}
            className={"cross-plus"}
          ></motion.span>
          Select your bread
          <span className={"emoji"}>🍔</span>
        </motion.h2>
        <motion.section
          initial={false}
          animate={{
            height: breadToOpen ? "auto" : 0,
          }}
        >
          {/* check that ingredient.bread exist and is stored in an array */}
          {ingredients.bread && Array.isArray(ingredients.bread) && (
            <motion.article
              initial={false}
              animate={{
                display: breadToOpen ? "block" : "none",
              }}
            >
              {breadIng.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "bread")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li onClick={() => handleDelete(ingredient._id, "bread")}>
                      ❌
                    </li>
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
        <motion.h2
          initial={false}
          animate={{
            color: meatToOpen ? "#c85a44" : "#825b56",
          }}
          onClick={() => setMeatToOpen(!meatToOpen)}
        >
          <motion.span
            initial={false}
            animate={{
              backgroundColor: meatToOpen ? "#c85a44" : "#825b56",
            }}
            className={"cross-minus"}
          ></motion.span>{" "}
          <motion.span
            className={"cross-plus"}
            initial={false}
            animate={{
              opacity: meatToOpen ? 0 : 1,
            }}
          ></motion.span>
          Select your protein <span className={"emoji"}>🥩</span>
        </motion.h2>
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
                display: meatToOpen ? "block" : "none",
              }}
            >
              {meatIng.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "meat")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li onClick={() => handleDelete(ingredient._id, "meat")}>
                      ❌
                    </li>
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
        <motion.h2
          initial={false}
          animate={{
            color: cheeseToOpen ? "#c85a44" : "#825b56",
          }}
          onClick={() => setCheeseToOpen(!cheeseToOpen)}
        >
          <motion.span
            initial={false}
            animate={{
              backgroundColor: cheeseToOpen ? "#c85a44" : "#825b56",
            }}
            className={"cross-minus"}
          ></motion.span>{" "}
          <motion.span
            className={"cross-plus"}
            initial={false}
            animate={{
              opacity: cheeseToOpen ? 0 : 1,
            }}
          ></motion.span>
          Select your Cheese <span className={"emoji"}>🧀</span>
        </motion.h2>
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
                display: cheeseToOpen ? "block" : "none",
              }}
            >
              {cheeseIng.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "cheese")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li onClick={() => handleDelete(ingredient._id, "cheese")}>
                      ❌
                    </li>
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
        <motion.h2
          initial={false}
          animate={{
            color: toppingToOpen ? "#c85a44" : "#825b56",
          }}
          onClick={() => setToppingToOpen(!toppingToOpen)}
        >
          <motion.span
            initial={false}
            animate={{
              backgroundColor: toppingToOpen ? "#c85a44" : "#825b56",
            }}
            className={"cross-minus"}
          ></motion.span>{" "}
          <motion.span
            className={"cross-plus"}
            initial={false}
            animate={{
              opacity: toppingToOpen ? 0 : 1,
            }}
          ></motion.span>
          Select your topping <span className={"emoji"}>🥗</span>
        </motion.h2>
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
                display: toppingToOpen ? "block" : "none",
              }}
            >
              {toppingIng.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "topping")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li onClick={() => handleDelete(ingredient._id, "topping")}>
                      ❌
                    </li>
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
        <motion.h2
          initial={false}
          animate={{
            color: sauceToOpen ? "#c85a44" : "#825b56",
          }}
          onClick={() => setSauceToOpen(!sauceToOpen)}
        >
          <motion.span
            initial={false}
            animate={{
              backgroundColor: sauceToOpen ? "#c85a44" : "#825b56",
            }}
            className={"cross-minus"}
          ></motion.span>
          <motion.span
            className={"cross-plus"}
            initial={false}
            animate={{
              opacity: sauceToOpen ? 0 : 1,
            }}
          ></motion.span>
          Select your sauce
          <span className={"emoji"}>🥫</span>
        </motion.h2>
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
                display: sauceToOpen ? "block" : "none",
              }}
            >
              {sauceIng.map((ingredient, i) => (
                <aside className="ingredient-card">
                  <h3 onClick={() => handleClick(i, "sauce")}>
                    {ingredient.name}
                  </h3>
                  <ul className="ingredient-list">
                    <li>Protein:</li>
                    <li>{ingredient.protein}</li>
                    <li>Carbs:</li>
                    <li>{ingredient.carbs}</li>
                    <li onClick={() => handleDelete(ingredient._id, "sauce")}>
                      ❌
                    </li>
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
      <section className="custom-burger-animation"></section>
      <section className="ingredient-total">
        <h2>Great burger you just made !</h2>
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
        {err && <span>{err}</span>}
        <button onClick={onClickToggle}>Add to favorites</button>
      </section>
      <section
        className={`ingredient-total ${
          togglePopUp ? "name-pop-up-visible" : "name-pop-up-hidden"
        }`}
      >
        <h2>What dont you give it a name !</h2>

        <input
          type="text"
          name="name"
          className="inputs"
          onChange={handleChange}
        />
        {errName && <span>{errName}</span>}

        <button onClick={handleSubmit}>Add to favorites</button>
      </section>
    </motion.main>
  );
};

export default CustomBurgers;
