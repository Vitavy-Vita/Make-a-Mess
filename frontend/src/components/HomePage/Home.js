import { motion } from "framer-motion";
import Button from "../NavBar/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function Home() {
  const auth = useAuth();
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
      <section>
        <h1>Welcome to Make-a-Mess</h1>
        <p>Tired of not knowing what you can or cannot eat ?</p>
        <article>
          <h2>Let us help you!</h2>
          <Button />
          {!auth.user && (
            <span>
              Make sure to <NavLink to={"/login"}>login</NavLink> first!
            </span>
          )}
        </article>
      </section>
    </motion.main>
  );
}
