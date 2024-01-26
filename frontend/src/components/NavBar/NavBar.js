import DesktopConnect from "./DesktopConnect";
import logo from "../../assets/images/logo-burger.png";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import MobileConnect from "./MobileConnect";

export default function NavBar() {
  const [state, setState] = useState({
    navClass: false,
    menuClass: false,
    menuIndex: false,
    hideLogo: false,
    burgerClass: false,
    toggleBurger: false,
  });

  const onClickToggle = () => {
    if (!state.toggleBurger) {
      setState({
        navClass: !state.navClass,
        menuClass: !state.menuClass,
        menuIndex: !state.menuIndex,
        hideLogo: !state.hideLogo,
        burgerClass: !state.burgerClass,
      });
    }
  };
  return (
    <motion.header>
      <motion.nav
        animate={{
          backgroundColor: state.navClass ? "#faf6f6" : "#c85a44",
          boxShadow: state.navClass
            ? "none"
            : "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <NavLink to={"/"}>
          <motion.img
            src={logo}
            alt="logo du site Make-a-Mess"
            className={state.hideLogo}
            initial={false}
            animate={{
              opacity: state.hideLogo ? 0 : 1,
            }}
          />
        </NavLink>
        <section className={"burger-menu"} onClick={onClickToggle}>
          <motion.span
            className={"burger-bar"}
            initial={false}
            animate={{
              rotate: state.burgerClass ? 45 : 0,
              y: state.burgerClass ? 15 : 0,
            }}
            transition={{
              duration: 0.5,
            }}
          ></motion.span>
          <motion.span
            className={"burger-bar"}
            initial={false}
            animate={{
              opacity: state.burgerClass ? 0 : 1,
            }}
          ></motion.span>
          <motion.span
            className={`burger-bar ${
              state.burgerClass ? "unclicked" : "clicked"
            }`}
            initial={false}
            animate={{
              rotate: state.burgerClass ? -45 : 0,
              y: state.burgerClass ? -2 : 0,
            }}
            transition={{
              duration: 0.1,
            }}
          ></motion.span>
        </section>
        <DesktopConnect />
        <MobileConnect />
        <section className={`menu ${state.menuIndex ? "visible" : "hidden"}`}>
          <ul className="nav-menu">
            <li>
              <NavLink
                to={"/"}
                className={"nav-option"}
                onClick={onClickToggle}
              >
                Home Page
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/ideas"}
                className={"nav-option"}
                onClick={onClickToggle}
              >
                Need Ideas?
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/about"}
                className={"nav-option"}
                onClick={onClickToggle}
              >
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/contact"}
                className={"nav-option"}
                onClick={onClickToggle}
              >
                Contact Us
              </NavLink>
            </li>
            <Button onClickToggle={onClickToggle} />
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
            <NavLink to={"/ideas"} className={"nav-option"}>
              Need Ideas?
            </NavLink>
          </li>

          <li>
            <NavLink to={"/about"} className={"nav-option"}>
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink to={"/contact"} className={"nav-option"}>
              Contact Us
            </NavLink>
          </li>
        </motion.ul>
      </motion.nav>
    </motion.header>
  );
}
