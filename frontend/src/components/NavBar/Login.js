import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useNavBarProvider } from "../../context/NavBarContext";
import { NavLink } from "react-router-dom";

export default function Login() {
  const value = useNavBarProvider();
  return (
    <aside>
      <FaRegUserCircle className={"react-icon"} onClick={value.onClickSlide} />
      <section className={"login-area-desktop"}>
        <article className="buttons">
          <NavLink to={"/CreateAccount"}>
            <MdOutlineManageAccounts className="form-icon" /> New Account
          </NavLink>
          <NavLink to={"/Login"} >
            <IoIosLogIn className="form-icon" /> Login
          </NavLink>
          <NavLink to={"/Settings/Admin"} >Settings</NavLink>
        </article>
      </section>
    </aside>
  );
}
