import { motion } from "framer-motion";
import BurgerGallery from "./BurgerGallery";

export default function Ideas() {
  return (
    <motion.article
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: "0.2s" }}
    >
      <BurgerGallery />
    </motion.article>
  );
}
