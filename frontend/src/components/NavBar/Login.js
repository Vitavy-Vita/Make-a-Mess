import { FaRegUserCircle } from "react-icons/fa";
import { useNavBarProvider } from "../../context/NavBarContext";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Login() {
  const value = useNavBarProvider();
  return (
    <aside>
      <FaRegUserCircle className={"react-icon"} onClick={value.onClickSlide} />
      <article className={"login-area-desktop"}>
        <section className="buttons">
          <NavLink to={"/CreateAccount"}>
            <MdOutlineManageAccounts className="form-icon" /> New Account
          </NavLink>
          <NavLink to={"/Login"}>
            <IoIosLogIn className="form-icon" /> Login
          </NavLink>
        </section>
      </article>
    </aside>
  );
}
