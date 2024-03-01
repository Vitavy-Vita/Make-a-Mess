import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
const ToppingCard = () => {
  const [topping, setTopping] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/custom/topping/${id}`)
      .then((res) => {
        setTopping(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        mass: 7,
        damping: 50,
      }}
      className="user-card-container"
    >
      {topping && (
        <article className="user-card">
          <h2>{topping.name}</h2>
          <p>Protein: {topping.protein}</p>
          <p>Carbs: {topping.carbs}</p>
          <p>Fat: {topping.fat}</p>
          <p>Calories: {topping.calories}</p>
          <NavLink to={"/update/topping"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </motion.main>
  );
};

export default ToppingCard;
