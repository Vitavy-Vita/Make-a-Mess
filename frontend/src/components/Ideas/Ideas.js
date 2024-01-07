import { motion } from "framer-motion";
import BurgerGallery from "./BurgerGallery";

export default function Ideas() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: "0.2s" }}
    >
      <section className="main-title">
        <h2>Here is a few pre-made</h2>
        <h1>Burger !!</h1>
      </section>
      <BurgerGallery />
    </motion.main>
  );
}
