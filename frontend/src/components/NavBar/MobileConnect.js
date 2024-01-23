import { NavLink, useNavigate } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

export default function MobileConnect() {
  const [connectMenu, setConnectMenu] = useState(false);
  const [toggleConnect, setToggleConnect] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };
  const onClickSlide = function () {
    if (!toggleConnect) {
      setConnectMenu(!connectMenu);
      setToggleConnect(toggleConnect);
    }
  };

  return (
    <aside className={"mobile-connect"}>
      <FaRegUserCircle className={"react-icon"} onClick={onClickSlide} />
      <section className={`${connectMenu ? "slide-in" : "slide-out"}`}>
        <article className="buttons">
          {auth.user ? (
            <>
              <NavLink to={"/my-profil"} onClick={onClickSlide}>
                <MdOutlineManageAccounts className="form-icon" />
                My Profil
              </NavLink>
              <a onClick={handleLogout}>
                <IoIosLogIn className="form-icon" />
                Logout
              </a>
              {auth.user.role === "admin" ? (
                <NavLink to={"/settings/admin"} onClick={onClickSlide}>
                  <IoIosSettings className="form-icon" />
                  Settings
                </NavLink>
              ) : (
                <NavLink to={"/settings/user"} onClick={onClickSlide}>
                  <IoIosSettings className="form-icon" />
                  Settings
                </NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink to={"/create-account"} onClick={onClickSlide}>
                <MdOutlineManageAccounts className="form-icon" />
                New Account
              </NavLink>
              <NavLink to={"/login"} onClick={onClickSlide}>
                {" "}
                <IoIosLogIn className="form-icon" />
                Login
              </NavLink>
            </>
          )}
        </article>
      </section>
    </aside>
  );
}
