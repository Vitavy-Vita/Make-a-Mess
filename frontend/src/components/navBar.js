import logo from "../assets/images/logo-burger.png";
import Login from "./Login"
import { useState, useEffect } from "react";

export default function BurgerMenu() {
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [navClass, setNavClass] = useState("nav red");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [menuIndex, setMenuIndex] = useState("nav-menu hidden");
  const [toggleBurger, setToggleBurger] = useState(false);
  const [stickyCLass, setStickyClass] = useState(false);
  const [moveLogo, setMoveLogo] = useState("");

  useEffect(() => {
    const stickNavbar = () => {
      setStickyClass(window.scrollY > 10);
    };
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const onClickToggle = function () {
    if (!toggleBurger) {
      setMoveLogo("move-in");
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
      setNavClass("nav gray");
      setMenuIndex("nav-menu visible");
    } else {
      setMoveLogo("move-out");
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
      setNavClass("nav red");
      setMenuIndex("nav-menu hidden");
    }
    setToggleBurger(!toggleBurger);
  };
  return (
    <div className={`${stickyCLass ? "sticky" : ""}`}>
      <nav className={navClass}>
        <img src={logo} alt="logo du site Make-a-Mess" className={moveLogo} />
        <div className={"burger-menu"} onClick={onClickToggle}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
        <Login/>
        <div className={menuClass}>
          <ul className={menuIndex}>
            <a className={"nav-option"}>Home Page</a>
            <a className={"nav-option"}>Need Ideas?</a>
            <a className={"nav-option"}>About Us</a>
            <a className={"nav-option"}>Contact Us</a>
          </ul>
          <a className={"button"} href="#">
            Start Building
          </a>
        </div>
        <ul className={"nav-tablet-desktop"}>
          <a className={"nav-option"}>Home Page</a>
          <a className={"nav-option"}>Need Ideas?</a>
          <a className={"nav-option"}>About Us</a>
          <a className={"nav-option"}>Contact Us</a>
        </ul>
      </nav>
    </div>
  );
}
