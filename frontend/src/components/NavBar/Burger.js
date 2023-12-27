import { useNavBarProvider } from "../../context/NavBarContext";

export default function Burger(props){
    const value = useNavBarProvider();

    return(
        <div className={"burger-menu"} onClick={value.onClickToggle}>
        <div className={value.burgerClass}></div>
        <div className={value.burgerClass}></div>
        <div className={value.burgerClass}></div>
      </div>
    )
}