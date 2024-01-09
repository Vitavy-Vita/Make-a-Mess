import { motion } from "framer-motion";
export default function Home() {
  return (
    <motion.section
    initial={{ width: 0 }}
    animate={{ width: "100%" }}
    exit={{  y: window.innerWidth, transition: "1s" }}
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
