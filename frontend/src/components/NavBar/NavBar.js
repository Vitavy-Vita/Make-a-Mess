import { useNavBarProvider } from "../../context/NavBarContext";
import Login from "./Login";
import Burger from "./Burger";
import Logo from "./Logo";
import Button from "./Button";

export default function NavBar(props) {
  const value = useNavBarProvider();

  return (
    <nav className={value.navClass}>
      <Logo />
      <Burger />
      <Login />
      <section className={value.menuClass}>
        <ul className={value.menuIndex}>
          <li>
            <a href="/" className={"nav-option"}>
              Home Page
            </a>
          </li>

          <li>
            <a href="/Ideas" className={"nav-option"}>
              Need Ideas?
            </a>
          </li>

          <li>
            <a href="/About" className={"nav-option"}>
              About Us{" "}
            </a>
          </li>

          <li>
            <a href="/Contact" className={"nav-option"}>
              Contact Us{" "}
            </a>
          </li>
        </ul>
        <Button />
      </section>
      <ul className={"nav-tablet-desktop"}>
        <li>
          {" "}
          <a href="/" className={"nav-option"}>
            Home Page
          </a>
        </li>

        <li>
          {" "}
          <a href="/Ideas" className={"nav-option"}>
            Need Ideas?
          </a>
        </li>

        <li>
          {" "}
          <a href="/About" className={"nav-option"}>
            About Us{" "}
          </a>
        </li>

        <li>
          <a href="/Contact" className={"nav-option"}>
            Contact Us
          </a>
        </li>
      </ul>
    </nav>
  );
}
