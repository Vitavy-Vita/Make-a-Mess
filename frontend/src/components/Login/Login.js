import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
export default function Login() {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: "0.2s" }}
    >
      <LoginForm />
    </motion.div>
  );
}
