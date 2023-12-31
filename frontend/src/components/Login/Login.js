import NavBarProvider from "../../context/NavBarContext";
import DisplayPage from "../Login/DisplayLogin";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: "0.2s" }}
    >
      <NavBarProvider>
        <DisplayPage />
      </NavBarProvider>
    </motion.div>
  );
}