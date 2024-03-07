import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import token from "../../context/token";
import IngredientList from "./IngredientList";
import IngredientTitle from "./IngredientTitle";
import AnimatedBurger from "./AnimatedBurger";
import IngredientTotal from "./IngredientTotal";

const CustomBurgers = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState();

  const [breadToOpen, setBreadToOpen] = useState(false);
  const [meatToOpen, setMeatToOpen] = useState(false);
  const [cheeseToOpen, setCheeseToOpen] = useState(false);
  const [sauceToOpen, setSauceToOpen] = useState(false);
  const [toppingToOpen, setToppingToOpen] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const [favoriteIngredients, setFavoriteIngredients] = useState([]);

  const [breadIng, setBreadIng] = useState([]);
  const [meatIng, setMeatIng] = useState([]);
  const [cheeseIng, setCheeseIng] = useState([]);
  const [sauceIng, setSauceIng] = useState([]);
  const [toppingIng, setToppingIng] = useState([]);

  const [inputs, setInputs] = useState({ name: "" });
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
      .get(`${process.env.REACT_APP_BASE_URL}/ingredients`)
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
    const removeIng = selectedIngredient.filter((ing) => ing._id !== i);

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
  };

  const handleChange = (e) => {
    setInputs({ name: e.target.value });
    setErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // we make sure that if the user has not selected every ingredient, he is not allowed to save to its favorites.
    // selectedIngredient being an array we make sure that as long as there is not 5 ingredients, its not possible to continue.
    if (selectedIngredient.length !== 5) {
      return setErr("You need to select all ingredients first.");
    }
    if (inputs.name.trim() === "") {
      return setErr("Name format incorrect");
    }
    // the user is able to add those burger and giving it a name to add to its favorites.
    // we need the macros datas stored in totalMacros
    // we need the name of each ingredients, being here stored in favoriteIngredient
    // the field inputs comes from the pop-up and only contains the name
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/favorites`,
        { ...totalMacros, ingredients: favoriteIngredients, ...inputs },
        {
          headers: token(),
        }
      )
      .then((res) => {
        navigate("/my-profil");
      })
      .catch((res) => {
        setErr(res.response.data.message);
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
        <IngredientTitle
          title={"Select your bread"}
          emoji={"🍔"}
          isOpen={breadToOpen}
          onClick={() => setBreadToOpen(!breadToOpen)}
        />
        <motion.section
          aria-label="accordion"
          initial={false}
          animate={{
            height: breadToOpen ? "auto" : 0,
          }}
        >
          {ingredients.bread && (
            <IngredientList
              isOpen={breadToOpen}
              ingredients={breadIng}
              onClick={(index) => handleClick(index, "bread")}
              onDelete={(id) => handleDelete(id, "bread")}
            />
          )}
        </motion.section>
        <IngredientTitle
          isOpen={meatToOpen}
          onClick={() => setMeatToOpen(!meatToOpen)}
          title={"Select your meat"}
          emoji={"🥩"}
        />
        <motion.section
          aria-label="accordion"
          initial={false}
          animate={{
            height: meatToOpen ? "auto" : 0,
          }}
        >
          {ingredients.meat && (
            <IngredientList
              isOpen={meatToOpen}
              ingredients={meatIng}
              onClick={(index) => handleClick(index, "meat")}
              onDelete={(id) => handleDelete(id, "meat")}
            />
          )}
        </motion.section>
        <IngredientTitle
          isOpen={cheeseToOpen}
          onClick={() => setCheeseToOpen(!cheeseToOpen)}
          title={"Select your cheese"}
          emoji={"🧀"}
        />
        <motion.section
          aria-label="accordion"
          initial={false}
          animate={{
            height: cheeseToOpen ? "auto" : 0,
          }}
        >
          {ingredients.cheese && (
            <IngredientList
              isOpen={cheeseToOpen}
              ingredients={cheeseIng}
              onClick={(index) => handleClick(index, "cheese")}
              onDelete={(id) => handleDelete(id, "cheese")}
            />
          )}
        </motion.section>
        <IngredientTitle
          isOpen={toppingToOpen}
          onClick={() => setToppingToOpen(!toppingToOpen)}
          title={"Select your topping"}
          emoji={"🥗"}
        />
        <motion.section
          aria-label="accordion"
          initial={false}
          animate={{
            height: toppingToOpen ? "auto" : 0,
          }}
        >
          {ingredients.topping && (
            <IngredientList
              isOpen={toppingToOpen}
              ingredients={toppingIng}
              onClick={(index) => handleClick(index, "topping")}
              onDelete={(id) => handleDelete(id, "topping")}
            />
          )}
        </motion.section>
        <IngredientTitle
          isOpen={sauceToOpen}
          onClick={() => setSauceToOpen(!sauceToOpen)}
          title={"Select your sauce"}
          emoji={"🥫"}
        />
        <motion.section
          aria-label="accordion"
          initial={false}
          animate={{
            height: sauceToOpen ? "auto" : 0,
          }}
        >
          {ingredients.sauce && (
            <IngredientList
              isOpen={sauceToOpen}
              ingredients={sauceIng}
              onClick={(index) => handleClick(index, "sauce")}
              onDelete={(id) => handleDelete(id, "sauce")}
            />
          )}
        </motion.section>
      </section>
      <AnimatedBurger />
      <IngredientTotal
        totalMacros={totalMacros}
        err={err}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </motion.main>
  );
};

export default CustomBurgers;
