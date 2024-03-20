import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";

const PreMadeCard = () => {
  const isDesktop = useMediaQuery("(min-width: 991px)");
  const [preMade, setPremade] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/burgers/${id}`)
      .then((res) => {
        setPremade(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);

  const displayDesktop = isDesktop
    ? {
        width: "300px",
        height: "200px",
        borderRadius: "15px",
        border: "4px solid #faf6f6",
      }
    : {};
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
      {preMade && (
        <article className="user-card">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/assets/img/${preMade.image.src}`}
            alt={preMade.image.alt}
            className="premade-card-img"
            style={displayDesktop}
          />
          <h2>{preMade.name}</h2>
          <p>Description: {preMade.description}</p>
          <p>Protein: {preMade.protein}</p>
          <p>Carbs: {preMade.carbs}</p>
          <p>Fat: {preMade.fat}</p>
          <p>Calories: {preMade.calories}</p>
          <NavLink to={"/burgers/new"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </motion.main>
  );
};

export default PreMadeCard;
