import { NavLink } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

export default function MobileConnect() {
  const [connectMenu, setConnectMenu] = useState(false);
  const [toggleConnect, setToggleConnect] = useState(false);

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
          <NavLink to={"/CreateAccount"} onClick={onClickSlide}>
            <MdOutlineManageAccounts
              className="form-icon"
             
            />
            New Account
          </NavLink>
          <NavLink to={"/Login"} onClick={onClickSlide}>
            {" "}
            <IoIosLogIn className="form-icon" />
            Login
          </NavLink>
          <NavLink to={"/Settings/Admin"} onClick={onClickSlide}>
            <IoIosSettings className="form-icon" />
            Settings
          </NavLink>
        </article>
      </section>
    </aside>
  );
}
