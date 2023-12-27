import logo from "../../assets/images/logo-burger.png";
import { useBurgerProvider } from "../../context/NavBarContext";

export default function Logo() {
  const value = useBurgerProvider();
  return (
    <img src={logo} alt="logo du site Make-a-Mess" className={value.moveLogo} />
  );
}
