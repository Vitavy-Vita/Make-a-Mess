import { FaRegUserCircle } from "react-icons/fa";
import { useNavBarProvider } from "../../context/NavBarContext";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";

export default function Login() {
  const value = useNavBarProvider();
  return (
    <aside>
      <FaRegUserCircle className={"react-icon"} onClick={value.onClickSlide} />
      <article className={"login-area-desktop"}>
        <section className="buttons">
          <a href="/CreateAccount">
            <MdOutlineManageAccounts className="form-icon" /> New Account
          </a>
          <a href="/Login">
            <IoIosLogIn className="form-icon" /> Login
          </a>
        </section>
      </article>
    </aside>
  );
}
