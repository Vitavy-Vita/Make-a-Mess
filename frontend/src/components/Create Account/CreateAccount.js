import { motion } from "framer-motion";
import CreateForm from "./CreateForm";

export default function CreateAccount() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: "0.2s" }}
    >
      <CreateForm />
    </motion.main>
  );
}
