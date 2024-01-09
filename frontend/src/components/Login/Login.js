import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
export default function Login() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{  y: window.innerWidth, transition: "1s" }}
    >
      <LoginForm />
    </motion.main>
  );
}
