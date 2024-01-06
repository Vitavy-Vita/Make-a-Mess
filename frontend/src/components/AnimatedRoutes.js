import CreateAccount from "./Create Account/CreateAccount";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./HomePage/Home";
import Login from "./Login/Login";
import Ideas from "./Ideas/Ideas";
import About from "./About us/About";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Ideas" element={<Ideas />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}
