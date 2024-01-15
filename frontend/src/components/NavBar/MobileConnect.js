import { NavLink } from "react-router-dom";
import { useNavBarProvider } from "../../context/NavBarContext";

export default function MobileConnect() {
  const value = useNavBarProvider()
  return (
    <aside className={"mobile-connect"}>
      <section className={value.connectSlide}>
        <article className="buttons">
          <NavLink to={"/CreateAccount"}>New Account</NavLink>
          <NavLink to={"/Login"}>Login</NavLink>
          <NavLink to={"/Settings/Admin"}>Settings</NavLink>
          </article>
      </section>
    </aside>
  );
}
