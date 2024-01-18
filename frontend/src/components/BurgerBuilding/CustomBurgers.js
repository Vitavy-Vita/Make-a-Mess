import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomBurgers = () => {
  const [ingredients, setIngredients] = useState([]);
  const [toggle, setToggle] = useState(false)
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
    const newI = ingredients[name].filter(ing => ing._id == selectedIngredient[i]._id)

    setIngredients({...ingredients,[name]: newI});
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
    selectedIngredient.splice(i,1)
    console.log(ingredients);
    setToggle(true)
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
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your bread{" "}
          <span className={"emoji"}>🍔</span>
        </h2>
        <section>
          {ingredients.bread && (
            <article>
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
            </article>
          )}
        </section>
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your protein{" "}
          <span className={"emoji"}>🥩</span>
        </h2>
        <section>
          {ingredients.meat && (
            <article>
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
            </article>
          )}
        </section>
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your Cheese{" "}
          <span className={"emoji"}>🧀</span>
        </h2>
        <section>
          {ingredients.cheese && (
            <article>
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
            </article>
          )}
        </section>
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your topping{" "}
          <span className={"emoji"}>🥗</span>
        </h2>
        <section>
          {ingredients.topping && (
            <article>
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
            </article>
          )}
        </section>
        <h2>
          <span className={"cross-plus"}></span>{" "}
          <span className={"cross-minus"}></span>Select your sauce{" "}
          <span className={"emoji"}>🥫</span>
        </h2>
        <section>
          {ingredients.sauce && (
            <article>
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
            </article>
          )}
        </section>
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
