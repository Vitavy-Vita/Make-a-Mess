import NavBarProvider from "../../context/NavBarContext";
import DisplayPage from "../Ideas/DisplayIdeas";
import { motion } from "framer-motion";

export default function Ideas() {
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
