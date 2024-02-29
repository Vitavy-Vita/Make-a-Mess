import { motion } from "framer-motion";

const IngredientTitle = ({ onClick, isOpen, title, emoji }) => {
  return (
    <motion.h2
      initial={false}
      animate={{
        color: isOpen ? "#c85a44" : "#825b56",
      }}
      onClick={onClick}
    >
      <motion.span
        initial={false}
        animate={{
          backgroundColor: isOpen ? "#c85a44" : "#825b56",
        }}
        className={"cross-minus"}
      ></motion.span>
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
