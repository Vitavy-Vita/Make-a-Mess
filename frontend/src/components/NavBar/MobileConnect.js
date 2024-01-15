import { NavLink } from "react-router-dom";
import { useNavBarProvider } from "../../context/NavBarContext";

export default function MobileConnect() {
  const value = useNavBarProvider()
  return (
    <aside className={"mobile-connect"}>
      <section className={value.connectSlide}>
        <article className="buttons">
          <NavLink to={"/CreateAccount"} onClick={value.onClickSlide}>New Account</NavLink>
          <NavLink to={"/Login"} onClick={value.onClickSlide}>Login</NavLink>
          <NavLink to={"/Settings/Admin"} onClick={value.onClickSlide}>Settings</NavLink>
          </article>
      </section>
    </aside>
  );
}
