import { createContext, useContext, useState, useEffect } from "react";

const BurgerContext = createContext();

export default function NavBarProvider(props) {
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [navClass, setNavClass] = useState("nav red");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [menuIndex, setMenuIndex] = useState("nav-menu hidden");
  const [toggleBurger, setToggleBurger] = useState(false);
  const [stickyCLass, setStickyClass] = useState(false);
  const [moveLogo, setMoveLogo] = useState("");

  useEffect(() => {
    const stickNavbar = () => {
        setStickyClass(window.scrollY > 10);
        console.log(window.scrollY);
    };
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);
  const onClickToggle = function () {
    if (!toggleBurger) {
      setMoveLogo("move-in");
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
      setNavClass("nav gray");
      setMenuIndex("nav-menu visible");
    } else {
      setMoveLogo("move-out");
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
      setNavClass("nav red");
      setMenuIndex("nav-menu hidden");
    }
    setToggleBurger(!toggleBurger);
  };
  return (
    <BurgerContext.Provider
      value={{
        burgerClass: burgerClass,
        navClass: navClass,
        menuClass: menuClass,
        menuIndex: menuIndex,
        stickyCLass: stickyCLass,
        moveLogo: moveLogo,
        onClickToggle: onClickToggle,
      }}
    >
      {props.children}
    </BurgerContext.Provider>
  );
}

export function useBurgerProvider() {
  const value = useContext(BurgerContext);
  return value;
}
