import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const SauceCard = () => {
  const [sauce, setSauce] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/custom/sauce/${id}`)
      .then((res) => {
        setSauce(res.data);
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
      {sauce && (
        <article className="user-card">
          <h2>{sauce.name}</h2>
          <p>Protein: {sauce.protein}</p>
          <p>Carbs: {sauce.carbs}</p>
          <p>Fat: {sauce.fat}</p>
          <p>Calories: {sauce.calories}</p>
          <NavLink to={"/update/sauce"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </motion.main>
  );
};

export default SauceCard;
