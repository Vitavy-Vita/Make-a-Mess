import { useBurgerProvider } from "../context/NavBarContext";
import Login from "./Login";
import Burger from "./Burger";
import logo from "../assets/images/logo-burger.png";


export default function NavBar(props) {
  const value = useBurgerProvider();

  return (
    <nav className={value.navClass}>
      <img
        src={logo}
        alt="logo du site Make-a-Mess"
        className={value.moveLogo}
      />
      <Burger />
      <Login />

      <div className={value.menuClass}>
        <ul className={value.menuIndex}>
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
  );
}
