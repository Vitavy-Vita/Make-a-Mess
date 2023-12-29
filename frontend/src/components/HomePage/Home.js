import NavBarProvider from "../../context/NavBarContext";
import OnClickToggle from "../NavBar/DisplayNavBar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavBarProvider>
        <OnClickToggle />
      </NavBarProvider>
    </motion.div>
  );
}
