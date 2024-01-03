import NavBarProvider from "../../context/NavBarContext";
import DisplayPage from "../Create Account/DisplayCreateAccount";
import { motion } from "framer-motion";

export default function CreateAccount() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: "0.2s" }}
    >
      <NavBarProvider>
        <DisplayPage />
      </NavBarProvider>
    </motion.main>
  );
}
