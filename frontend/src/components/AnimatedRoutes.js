import CreateAccount from "./Create Account/CreateAccount";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./HomePage/Home";
import Login from "./Login/Login";
import Ideas from "./Ideas/Ideas";
import About from "./About us/About";
import Contact from "./Contact us/Contact";
import DashboardAdmin from "./Dashboard/DashboardAdmin";
import UpdateBurgerGallery from "./Dashboard/Databases/PreMadePages/UpdatePreMade";
import UpdateBread from "./Dashboard/Databases/BreadPages/UpdateBread";
import UpdateCheese from "./Dashboard/Databases/CheesePages/UpdateCheese";
import UpdateMeat from "./Dashboard/Databases/MeatPages/UpdateMeat";
import UpdateSauce from "./Dashboard/Databases/SaucePages/UpdateSauce";
import UpdateTopping from "./Dashboard/Databases/ToppingPages/UpdateTopping";
import BreadCard from "./Dashboard/Databases/BreadPages/BreadCard";
import CheeseCard from "./Dashboard/Databases/CheesePages/CheeseCard";
import MeatCard from "./Dashboard/Databases/MeatPages/MeatCard";
import PreMadeCard from "./Dashboard/Databases/PreMadePages/PreMadeCard";
import SauceCard from "./Dashboard/Databases/SaucePages/SauceCard";
import ToppingCard from "./Dashboard/Databases/ToppingPages/ToppingCard";
import CustomBurgers from "./BurgerBuilding/CustomBurgers";
import UserCard from "./Dashboard/Databases/UserPages/UserCard";
import UpdateBreadForm from "./Dashboard/Databases/BreadPages/UpdateBreadForm";
import UpdateCheeseForm from "./Dashboard/Databases/CheesePages/UpdateCheeseForm";
import UpdateMeatForm from "./Dashboard/Databases/MeatPages/UpdateMeatForm";
import UpdateSauceForm from "./Dashboard/Databases/SaucePages/UpdateSauceForm";
import UpdateToppingForm from "./Dashboard/Databases/ToppingPages/UpdateToppingForm";
import UpdatePreMadeForm from "./Dashboard/Databases/PreMadePages/UpdatePreMadeForm";
import PrivateRoutes from "./PrivateRoutes";
import ProfilPage from "./Profil/ProfilPage";
import DashboardUser from "./Dashboard/DashboardUser";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoutes roles={["admin", "user"]} />}>
          <Route path="/custom-burger" element={<CustomBurgers />} />
          <Route path="/settings/admin" element={<DashboardAdmin />} />
          <Route path="/settings/user" element={<DashboardUser/>} />
          <Route path="/my-profil" element={<ProfilPage />} />
        </Route>
        <Route path="/" element={<PrivateRoutes roles={["admin"]} />}>
          <Route path="/burgers/new" element={<UpdateBurgerGallery />} />
          <Route path="/burgers/:id" element={<PreMadeCard />} />
          <Route path="/burgers/:id/update" element={<UpdatePreMadeForm />} />

          <Route path="/update/bread" element={<UpdateBread />} />
          <Route path="/custom/bread/:id" element={<BreadCard />} />
          <Route
            path="/custom/bread/:id/update"
            element={<UpdateBreadForm />}
          />

          <Route path="/update/cheese" element={<UpdateCheese />} />
          <Route path="/custom/cheese/:id" element={<CheeseCard />} />
          <Route
            path="/custom/cheese/:id/update"
            element={<UpdateCheeseForm />}
          />

          <Route path="/update/meat" element={<UpdateMeat />} />
          <Route path="/custom/meat/:id" element={<MeatCard />} />
          <Route path="/custom/meat/:id/update" element={<UpdateMeatForm />} />

          <Route path="/update/sauce" element={<UpdateSauce />} />
          <Route path="/custom/sauce/:id" element={<SauceCard />} />
          <Route
            path="/custom/sauce/:id/update"
            element={<UpdateSauceForm />}
          />

          <Route path="/update/topping" element={<UpdateTopping />} />
          <Route path="/custom/topping/:id" element={<ToppingCard />} />
          <Route
            path="/custom/topping/:id/update"
            element={<UpdateToppingForm />}
          />

          <Route path="/users/:id" element={<UserCard />} />
         
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
