import { NavLink } from "react-router-dom";

export default function Button(props) {
  return (
    <NavLink to={"/custom-burger"} onClick={props.onClickToggle}>
      <button>Start building</button>
    </NavLink>
  );
}
