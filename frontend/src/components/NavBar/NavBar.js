import Login from "./Login";
import Burger from "./Burger";
import logo from "../../assets/images/logo-burger.png";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NavBar() {
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const [menuIndex, setMenuIndex] = useState(false);
  const [toggleBurger, setToggleBurger] = useState(false);
  const [hideLogo, setHideLogo] = useState();
  const onClickToggle = () => {
    if (!toggleBurger) {
      setNavClass(!navClass);
      setMenuClass(!menuClass);
      setMenuIndex(!menuIndex);
      setHideLogo(!hideLogo);
      setToggleBurger(toggleBurger);
    } else {
      setToggleBurger(!toggleBurger);
    }
  };

  return (
    <motion.nav
      animate={{
        backgroundColor: navClass ? "#faf6f6" : "#c85a44",
        boxShadow: navClass ? "none" : "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <motion.img
        src={logo}
        alt="logo du site Make-a-Mess"
        className={hideLogo}
        initial={false}
        animate={{
          opacity: hideLogo ? 0 : 1
        }}
      />
      <Burger onClickToggle={onClickToggle} />
      <Login  />
      <section className={`menu ${menuIndex ? "visible" : "hidden"}`}>
        <ul className="nav-menu">
          <li>
            <NavLink to={"/"} className={"nav-option"} onClick={onClickToggle}>
              Home Page
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/Ideas"}
              className={"nav-option"}
              onClick={onClickToggle}
            >
              Need Ideas?
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/About"}
              className={"nav-option"}
              onClick={onClickToggle}
            >
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/Contact"}
              className={"nav-option"}
              onClick={onClickToggle}
            >
              Contact Us
            </NavLink>
          </li>
          <Button />
        </ul>
      </section>
      <motion.ul className={"nav-tablet-desktop"}>
        <li>
          <NavLink to={"/"} className={"nav-option"}>
            Home Page
          </NavLink>
        </li>

        <li>
          {" "}
          <NavLink to={"/Ideas"} className={"nav-option"}>
            Need Ideas?
          </NavLink>
        </li>

        <li>
          <NavLink to={"/About"} className={"nav-option"}>
            About Us
          </NavLink>
        </li>

        <li>
          <NavLink to={"/Contact"} className={"nav-option"}>
            Contact Us
          </NavLink>
        </li>
      </motion.ul>
    </motion.nav>
  );
}
