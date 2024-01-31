import { NavLink } from "react-router-dom";


export default function Button(props) {

  return (
    <NavLink to={"/custom-burger"}>
      <button onClick={props.onClickToggle}>Start building</button>
    </NavLink>
  );
}
