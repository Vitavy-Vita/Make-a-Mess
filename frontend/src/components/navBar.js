import logo from "../assets/images/logo-burger.png";
import { useState } from "react";

export default function BurgerMenu() {
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [navClass, setNavClass] = useState("nav red");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [menuIndex, setMenuIndex] = useState("nav-menu hidden");
  const [toggleBurger, setToggleBurger] = useState(false);

  const onClickToggle = function () {
    if (!toggleBurger) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
      setNavClass("nav gray");
      setMenuIndex("nav-menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
      setNavClass("nav red");
      setMenuIndex("nav-menu hidden");
    }
    setToggleBurger(!toggleBurger);
  };
  return (
    <div>
      <nav className={navClass}>
        <img src={logo} alt="logo du site Make-a-Mess" />
        <div className={"burger-menu"} onClick={onClickToggle}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
        <div className={menuClass}>
          <ul className={menuIndex}>
            <a className={"nav-option"}>Home</a>
            <a className={"nav-option"}>Need Ideas?</a>
            <a className={"nav-option"}>About Us</a>
            <a className={"nav-option"}>Contact Us</a>
          </ul>
        </div>
      </nav>
    </div>
  );
}
