import {motion} from "framer-motion"

const AnimatedBurger = () => {
    return (
        <motion.section
        initial={{
          y: 0,
        }}
        animate={{
          y: [100, -200, 0, -200, 100, 100],
          x: [100, -200, 0, 200, -200, 100],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
        }}
        className="custom-burger-animation"
      ></motion.section>
    );
};

export default AnimatedBurger;