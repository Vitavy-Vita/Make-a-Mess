import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const BreadCard = () => {
  const [bread, setBread] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/custom/bread/${id}`)
      .then((res) => {
        setBread(res.data);
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
      {bread && (
        <article className="user-card">
          <h2>{bread.name}</h2>
          <p>Protein: {bread.protein}</p>
          <p>Carbs: {bread.carbs}</p>
          <p>Fat: {bread.fat}</p>
          <p>Calories: {bread.calories}</p>
          <NavLink to={"/update/bread"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </motion.main>
  );
};

export default BreadCard;
