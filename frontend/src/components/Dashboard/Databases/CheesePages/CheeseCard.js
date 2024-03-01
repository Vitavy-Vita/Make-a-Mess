import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
const CheeseCard = () => {
  const [cheese, setCheese] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/custom/cheese/${id}`)
      .then((res) => {
        setCheese(res.data);
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
      {cheese && (
        <article className="user-card">
          <h2>{cheese.name}</h2>
          <p>Protein: {cheese.protein}</p>
          <p>Carbs: {cheese.carbs}</p>
          <p>Fat: {cheese.fat}</p>
          <p>Calories: {cheese.calories}</p>
          <NavLink to={"/update/cheese"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </motion.main>
  );
};

export default CheeseCard;
