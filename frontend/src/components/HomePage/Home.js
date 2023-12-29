import NavBarProvider from "../../context/NavBarContext";
import DisplayPage from "../NavBar/DisplayNavBar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: "1sec" }}
      exit={{ opacity: 0 }}
    >
      <NavBarProvider>
        <DisplayPage />
      </NavBarProvider>
    </motion.div>
  );
}
