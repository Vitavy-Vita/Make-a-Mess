import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
const NotFoundRoute = () => {
  return (
    <main className="not-found-wrapper">
      <motion.figure
        animate={{
          x: [-160, 0],
          rotate: 180,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          mass: 10,
          damping: 0,
        }}
      ></motion.figure>
      <h1>Error 404</h1>
      <h2>You seem a bit lost, let me redirect you to</h2>
      <NavLink to={"/"}>
        <button>homepage</button>
      </NavLink>
      <motion.figure
        animate={{
          x: [160, 0],
          rotate: 180,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          mass: 10,
          damping: 0,
        }}
      ></motion.figure>
    </main>
  );
};

export default NotFoundRoute;
