import { useNavBarProvider } from "../../context/NavBarContext";

export default function Burger(props) {
  const value = useNavBarProvider();

  return (
    <section className={"burger-menu"} onClick={value.onClickToggle}>
      <span className={value.burgerClass}></span>
      <span className={value.burgerClass}></span>
      <span className={value.burgerClass}></span>
    </section>
  );
}
