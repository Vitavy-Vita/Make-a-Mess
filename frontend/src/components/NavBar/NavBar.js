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
          <a href="/Ideas" className={"nav-option"}>Need Ideas?</a>
          <a href="/About" className={"nav-option"}>About Us</a>
          <a className={"nav-option"}>Contact Us</a>
        </ul>
       <Button/>
      </div>
      <ul className={"nav-tablet-desktop"}>
        <a href= "/" className={"nav-option"}>
          <li>Home Page</li></a>
        <a href="/Ideas" className={"nav-option"}>
          <li>Need Ideas?</li></a>
        <a href="/About" className={"nav-option"}>
          <li>About Us</li></a>
        <a className={"nav-option"}>
          <li>Contact Us</li></a>
      </ul>
    </nav>
  );
}
