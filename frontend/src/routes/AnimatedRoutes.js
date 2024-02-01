import CreateAccount from "../components/Create Account/CreateAccount";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../components/HomePage/Home";
import Login from "../components/Login/Login";
import Ideas from "../components/Ideas/Ideas";
import About from "../components/About us/About";
import Contact from "../components/Contact us/Contact";
import DashboardAdmin from "../components/Dashboard/DashboardAdmin";
import UpdateBurgerGallery from "../components/Dashboard/Databases/PreMadePages/UpdatePreMade";
import UpdateBread from "../components/Dashboard/Databases/BreadPages/UpdateBread";
import UpdateCheese from "../components/Dashboard/Databases/CheesePages/UpdateCheese";
import UpdateMeat from "../components/Dashboard/Databases/MeatPages/UpdateMeat";
import UpdateSauce from "../components/Dashboard/Databases/SaucePages/UpdateSauce";
import UpdateTopping from "../components/Dashboard/Databases/ToppingPages/UpdateTopping";
import BreadCard from "../components/Dashboard/Databases/BreadPages/BreadCard";
import CheeseCard from "../components/Dashboard/Databases/CheesePages/CheeseCard";
import MeatCard from "../components/Dashboard/Databases/MeatPages/MeatCard";
import PreMadeCard from "../components/Dashboard/Databases/PreMadePages/PreMadeCard";
import SauceCard from "../components/Dashboard/Databases/SaucePages/SauceCard";
import ToppingCard from "../components/Dashboard/Databases/ToppingPages/ToppingCard";
import CustomBurgers from "../components/BurgerBuilding/CustomBurgers";
import UserCard from "../components/Dashboard/Databases/UserPages/UserCard";
import UpdateBreadForm from "../components/Dashboard/Databases/BreadPages/UpdateBreadForm";
import UpdateCheeseForm from "../components/Dashboard/Databases/CheesePages/UpdateCheeseForm";
import UpdateMeatForm from "../components/Dashboard/Databases/MeatPages/UpdateMeatForm";
import UpdateSauceForm from "../components/Dashboard/Databases/SaucePages/UpdateSauceForm";
import UpdateToppingForm from "../components/Dashboard/Databases/ToppingPages/UpdateToppingForm";
import UpdatePreMadeForm from "../components/Dashboard/Databases/PreMadePages/UpdatePreMadeForm";

import ProfilPage from "../components/Profil/ProfilPage";
import DashboardUser from "../components/Dashboard/DashboardUser";
import OTPInput from "../components/Login/OTPInput";
import ResetPassword from "../components/Login/ResetPassword";
import PrivateRoutes from "./PrivateRoutes";
import NotFoundRoute from "./NotFoundRoute";
import UpdateProfil from "../components/Profil/UpdateProfil";

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
        <Route path="/send/recovery-email/otp" element={<OTPInput />} />
        <Route
          path="/send/recovery-email/reset/:email"
          element={<ResetPassword />}
        />
        <Route path="*" element={<NotFoundRoute />} />

        <Route path="/" element={<PrivateRoutes roles={["admin", "user"]} />}>
          <Route path="/custom-burger" element={<CustomBurgers />} />
          <Route path="/settings/admin" element={<DashboardAdmin />} />
          <Route path="/my-profil/update" element={<DashboardUser />} />
          <Route path="/my-profil/update" element={<UpdateProfil />} />
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
