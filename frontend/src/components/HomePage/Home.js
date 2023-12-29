import NavBarProvider from "../../context/NavBarContext";
import OnClickToggle from "../NavBar/DisplayNavBar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: "0.2s" }}
    >
      <NavBarProvider>
        <OnClickToggle />
      </NavBarProvider>
    </motion.div>
  );
}
