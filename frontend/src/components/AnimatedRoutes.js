import CreateAccount from "./Create Account/CreateAccount";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./HomePage/Home";
import Login from "./Login/Login";
import Ideas from "./Ideas/Ideas";
import About from "./About us/About";
import Contact from "./Contact us/Contact";
import DashboardAdmin from "./Dashboard/DashboardAdmin";
import UpdateBurgerGallery from "./Dashboard/Databases/updatePreMade";
import UpdateBread from "./Dashboard/Databases/updateBread";
import UpdateCheese from "./Dashboard/Databases/updateCheese";
import UpdateMeat from "./Dashboard/Databases/updateMeat";
import UpdateSauce from "./Dashboard/Databases/updateSauce";
import UpdateTopping from "./Dashboard/Databases/updateTopping";
import UsersList from "./Dashboard/UsersList";


export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Ideas" element={<Ideas />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Settings/Admin" element={<DashboardAdmin />} />

        <Route path="/burgers/new" element={<UpdateBurgerGallery />} />

        <Route path="/update/bread" element={<UpdateBread />} />
        <Route path="/update/cheese" element={<UpdateCheese />} />
        <Route path="/update/meat" element={<UpdateMeat />} />
        <Route path="/update/sauce" element={<UpdateSauce />} />
        <Route path="/update/topping" element={<UpdateTopping />} />
        <Route path="/users" element={<UsersList/>} />


      </Routes>
    </AnimatePresence>
  );
}
