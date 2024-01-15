import { useNavBarProvider } from "../../context/NavBarContext";
import Login from "./Login";
import Burger from "./Burger";
import Logo from "./Logo";
import Button from "./Button";
import { NavLink } from "react-router-dom";

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
            <NavLink
              to={"/"}
              className={"nav-option"}
              onClick={value.onClickToggle}
            >
              Home Page
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/Ideas"}
              className={"nav-option"}
              onClick={value.onClickToggle}
            >
              Need Ideas?
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/About"}
              className={"nav-option"}
              onClick={value.onClickToggle}
            >
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/Contact"}
              className={"nav-option"}
              onClick={value.onClickToggle}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        <Button />
      </section>
      <ul className={"nav-tablet-desktop"}>
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
      </ul>
    </nav>
  );
}
