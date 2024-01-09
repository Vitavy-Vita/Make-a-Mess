import { motion } from "framer-motion";
import CreateForm from "./CreateForm";

export default function CreateAccount() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ y: window.innerWidth, transition: "1s" }}
    >
      <CreateForm />
    </motion.main>
  );
}
