import { NavLink } from "react-router-dom";
import { useNavBarProvider } from "../../context/NavBarContext";
import { IoIosLogIn } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";

export default function MobileConnect() {
  const value = useNavBarProvider();
  return (
    <aside className={"mobile-connect"}>
      <section className={value.connectSlide}>
        <article className="buttons">
          <NavLink to={"/CreateAccount"} onClick={value.onClickSlide}>
            {" "}
            <MdOutlineManageAccounts className="form-icon" />
            New Account
          </NavLink>
          <NavLink to={"/Login"} onClick={value.onClickSlide}>
            {" "}
            <IoIosLogIn className="form-icon" />
            Login
          </NavLink>
          <NavLink to={"/Settings/Admin"} onClick={value.onClickSlide}>
            <IoIosSettings className="form-icon" />
            Settings
          </NavLink>
        </article>
      </section>
    </aside>
  );
}
