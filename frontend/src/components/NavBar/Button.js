import { NavLink } from "react-router-dom";

export default function Button(){
    return(
        <NavLink to={"/CustomBurger"}>
        <button>Start building</button>
      </NavLink>
    )
}