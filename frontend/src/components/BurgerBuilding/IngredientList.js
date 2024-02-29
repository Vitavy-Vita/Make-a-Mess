import IngredientCard from "./IngredientCard";
import { motion } from "framer-motion";

const IngredientList = ({ ingredients, isOpen, onClick, onDelete }) => {
  return (
    <motion.article
      initial={false}
      animate={{
        display: isOpen ? "block" : "none",
      }}
    >
      {ingredients.map((ingredient, index) => (
        <IngredientCard
          key={index}
          ingredient={ingredient}
          onClick={() => onClick(index)}
          onDelete={() => onDelete(ingredient._id)}
        />
      ))}
    </motion.article>
  );
};

export default IngredientList;
