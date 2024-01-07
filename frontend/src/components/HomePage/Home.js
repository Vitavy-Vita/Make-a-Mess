import { motion } from "framer-motion";
export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: "1sec" }}
      exit={{ opacity: 0 }}
      className="home-page"
    >
      <h1 className={"main-title"}>Welcome to Make-a-Mess</h1>
      <p>Tired of not knowing what you can or cannot eat ?</p>
      <section>
        <h2>Let us help you!</h2>
        <a href="#">Start Building</a>
      </section>
    </motion.section>
  );
}
