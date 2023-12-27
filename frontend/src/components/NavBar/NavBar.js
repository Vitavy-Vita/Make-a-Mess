import { useNavBarProvider } from "../../context/NavBarContext";
import Login from "./Login";
import Burger from "./Burger";
import Logo from "./Logo";
import Button from "./Button";

export default function NavBar(props) {
  const value = useNavBarProvider();

  return (
    <nav className={value.navClass}>
      <Logo/>
      <Burger />
      <Login />
      <div className={value.menuClass}>
        <ul className={value.menuIndex}>
          <a href="/" className={"nav-option"}>Home Page</a>
          <a className={"nav-option"}>Need Ideas?</a>
          <a className={"nav-option"}>About Us</a>
          <a className={"nav-option"}>Contact Us</a>
        </ul>
       <Button/>
      </div>
      <ul className={"nav-tablet-desktop"}>
        <a href= "/" className={"nav-option"}>Home Page</a>
        <a className={"nav-option"}>Need Ideas?</a>
        <a className={"nav-option"}>About Us</a>
        <a className={"nav-option"}>Contact Us</a>
      </ul>
    </nav>
  );
}
