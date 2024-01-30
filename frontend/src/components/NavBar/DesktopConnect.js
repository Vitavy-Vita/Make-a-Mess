import { IoIosLogIn } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };
  return (
    <aside>
      <section className={"login-area-desktop"}>
        <article className="buttons">
          {auth.user ? (
            <>
              <NavLink to={"/my-profil"}>
                <MdOutlineManageAccounts className="form-icon" /> My Profil
              </NavLink>
              <a onClick={handleLogout}>
                <IoIosLogIn className="form-icon" />
                Logout
              </a>
              {auth.user.role === "admin" ? (
                <NavLink to={"/settings/admin"}>
                  <IoIosSettings className="form-icon" />
                  Settings
                </NavLink>
              ) : (
                <NavLink to={"/settings/user"}>
                  <IoIosSettings className="form-icon" />
                  Settings
                </NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink to={"/create-account"}>
                <MdOutlineManageAccounts className="form-icon" /> New Account
              </NavLink>
              <NavLink to={"/login"}>
                <IoIosLogIn className="form-icon" /> Login
              </NavLink>
            </>
          )}
        </article>
      </section>
    </aside>
  );
}
