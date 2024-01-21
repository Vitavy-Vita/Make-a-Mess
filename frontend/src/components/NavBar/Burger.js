import { useState } from "react";

export default function Burger(props) {

  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");


  return (
    <section className={"burger-menu"} onClick={props.onClickToggle}>
      <span className={burgerClass}></span>
      <span className={burgerClass}></span>
      <span className={burgerClass}></span>
    </section>
  );
}
