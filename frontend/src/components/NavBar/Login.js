import { IoIosLogIn } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <aside>
      <section className={"login-area-desktop"}>
        <article className="buttons">
          <NavLink to={"/CreateAccount"}>
            <MdOutlineManageAccounts className="form-icon" /> New Account
          </NavLink>
          <NavLink to={"/Login"}>
            <IoIosLogIn className="form-icon" /> Login
          </NavLink>
          <NavLink to={"/Settings/Admin"}>
            <IoIosSettings className="form-icon" />
            Settings
          </NavLink>
        </article>
      </section>
    </aside>
  );
}
