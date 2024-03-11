import { motion } from "framer-motion";
import bun from "../../assets/images/bun.png";
import onion from "../../assets/images/onion.png";
import steack from "../../assets/images/steack.png";
import tomato from "../../assets/images/tomato.png";
import salad from "../../assets/images/salad.png";
const AnimatedBurger = () => {
  return (
    <section className="animated-wrapper">
      <motion.img
        src={bun}
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
      />
      <motion.img
        src={onion}
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
      />
      <motion.img
        src={tomato}
        aria-label="Image of two slices of a tomato"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
        }}
        className="animated-tomato"
      />
      <motion.img
        src={steack}
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
      />
      <motion.img
        src={salad}
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
      />
    </section>
  );
};

export default AnimatedBurger;
