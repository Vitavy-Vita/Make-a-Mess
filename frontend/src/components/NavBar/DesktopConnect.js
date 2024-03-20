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
          {/* if a user is logged in, we show these */}
          {auth.user ? (
            <>
              <NavLink to={"/my-profil"}>
                <MdOutlineManageAccounts /> My Profil
              </NavLink>
              <a onClick={handleLogout}>
                <IoIosLogIn className="form-icon" />
                Logout
              </a>
              {/* if he's admin he gets this link to the dashboard admin */}
              {auth.user.role === "admin" ? (
                <NavLink to={"/settings/admin"}>
                  <IoIosSettings />
                  Settings
                </NavLink>
              ) : (
                // else its the user's settings
                <NavLink to={"my-profil/update"}>
                  <IoIosSettings />
                  Settings
                </NavLink>
              )}
            </>
          ) : (
            // else we show those
            <>
              <NavLink to={"/create-account"}>
                <MdOutlineManageAccounts /> New Account
              </NavLink>
              <NavLink to={"/login"}>
                <IoIosLogIn /> Login
              </NavLink>
            </>
          )}
        </article>
      </section>
    </aside>
  );
}
