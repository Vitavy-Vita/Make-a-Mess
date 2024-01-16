import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-burger.png";
import { useNavBarProvider } from "../../context/NavBarContext";

export default function Logo() {
  const value = useNavBarProvider();
  return (
    <NavLink to={"/"}>
      <img
        src={logo}
        alt="logo du site Make-a-Mess"
        className={value.moveLogo}
      />
    </NavLink>
  );
}
