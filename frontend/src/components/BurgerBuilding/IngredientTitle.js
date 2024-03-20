import { motion } from "framer-motion";

const IngredientTitle = ({ onClick, isOpen, title, emoji }) => {
  return (
    <motion.h2 initial={false} onClick={onClick}>
      <motion.span initial={false} className={"cross-minus"}></motion.span>
      <motion.span
        initial={false}
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        className={"cross-plus"}
      ></motion.span>
      {title}
      <span className={"emoji"}>{emoji}</span>
    </motion.h2>
  );
};

export default IngredientTitle;
