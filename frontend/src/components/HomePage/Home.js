import { motion } from "framer-motion";
import Button from "../NavBar/Button";
export default function Home() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        mass: 7,
        damping: 50,
      }}
      className="home-page"
    >
      <h1 className={"main-title"}>Welcome to Make-a-Mess</h1>
      <p>Tired of not knowing what you can or cannot eat ?</p>
      <section>
        <h2>Let us help you!</h2>
        <Button />
      </section>
    </motion.main>
  );
}
