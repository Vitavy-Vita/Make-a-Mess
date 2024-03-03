import { motion } from "framer-motion";

const AnimatedBurger = () => {
  return (
    <section className="animated-wrapper">
      <motion.figure
        role="img"
        aria-label="Image of a burger top bun"
        animate={{
          y: [-100, 0, -50, 0, -100],
          x: [-800, 0, 600, 0, -800],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
        }}
        className="animated-bun"
      ></motion.figure>
      <motion.figure
        role="img"
        aria-label="Image of a two slices of an onion"
        animate={{
          y: [-200, 0, -200, 0, -200],
          x: [600, 0, -800, 0, 600],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
        }}
        className="animated-onion"
      ></motion.figure>
      <motion.figure
        role="img"
        aria-label="Image of two slices of a tomato"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
        }}
        className="animated-tomato"
      ></motion.figure>
      <motion.figure
        role="img"
        aria-label="Image of a beef patty with cheese on it"
        animate={{
          y: [250, 0, 180, 0, 250],
          x: [-600, 0, 800, 0, -600],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
        }}
        className="animated-steack"
      ></motion.figure>
      <motion.figure
        role="img"
        aria-label="Image of the bottom bun of a burger with salad on it"
        animate={{
          y: [80, 0, 100, 0, 80],
          x: [800, 0, -600, 0, 800],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
        }}
        className="animated-salad"
      ></motion.figure>
    </section>
  );
};

export default AnimatedBurger;
