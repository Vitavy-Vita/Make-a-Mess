import CreateAccount from "./Create Account/CreateAccount";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./HomePage/Home";
import Login from "./Login/Login";
import Ideas from "./Ideas/Ideas";
import About from "./About us/About";
import Contact from "./Contact us/Contact";
import DashboardAdmin from "./Dashboard/DashboardAdmin";
import UpdateBurgerGallery from "./Dashboard/Databases/PreMadePages/updatePreMade";
import UpdateBread from "./Dashboard/Databases/BreadPages/updateBread";
import UpdateCheese from "./Dashboard/Databases/CheesePages/updateCheese";
import UpdateMeat from "./Dashboard/Databases/MeatPages/updateMeat";
import UpdateSauce from "./Dashboard/Databases/SaucePages/updateSauce";
import UpdateTopping from "./Dashboard/Databases/ToppingPages/updateTopping";
import UserPage from "./Dashboard/Databases/UserPages/UserCard";
import BreadCard from "./Dashboard/Databases/BreadPages/BreadCard";
import CheeseCard from "./Dashboard/Databases/CheesePages/CheeseCard";
import MeatCard from "./Dashboard/Databases/MeatPages/MeatCard";
import PreMadeCard from "./Dashboard/Databases/PreMadePages/PreMadeCard";
import SauceCard from "./Dashboard/Databases/SaucePages/SauceCard";
import ToppingCard from "./Dashboard/Databases/ToppingPages/ToppingCard";
import CustomBurgers from "./BurgerBuilding/CustomBurgers";
import UserCard from "./Dashboard/Databases/UserPages/UserCard";
import UpdateUserForm from "./Dashboard/Databases/UserPages/UpdateUserForm";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Ideas" element={<Ideas />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/CustomBurger" element={<CustomBurgers />} />

        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Settings/Admin" element={<DashboardAdmin />} />

        <Route path="/burgers/new" element={<UpdateBurgerGallery />} />
        <Route path="/burgers/:id" element={<PreMadeCard />} />

        <Route path="/update/bread" element={<UpdateBread />} />
        <Route path="/custom/bread/:id" element={<BreadCard />} />

        <Route path="/update/cheese" element={<UpdateCheese />} />
        <Route path="/custom/cheese/:id" element={<CheeseCard />} />

        <Route path="/update/meat" element={<UpdateMeat />} />
        <Route path="/custom/meat/:id" element={<MeatCard />} />

        <Route path="/update/sauce" element={<UpdateSauce />} />
        <Route path="/custom/sauce/:id" element={<SauceCard />} />

        <Route path="/update/topping" element={<UpdateTopping />} />
        <Route path="/custom/topping/:id" element={<ToppingCard />} />

        <Route path="/users/:id" element={<UserCard />} />
        <Route path="/users/:id/update" element={<UpdateUserForm />} />
       

      </Routes>
    </AnimatePresence>
  );
}
