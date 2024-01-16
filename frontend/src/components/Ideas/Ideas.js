import { motion } from "framer-motion";
import BurgerGallery from "./BurgerGallery";

export default function Ideas() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ y: window.innerWidth, transition: "1s"}}
      className="ideas-main"
    >
      <section className="main-title">
        <h2>Here is a few pre-made</h2>
        <h1>Burgers !!</h1>
      </section>
      <BurgerGallery />
    </motion.main>
  );
}
