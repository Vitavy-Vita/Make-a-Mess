import { createContext, useContext, useState, useEffect } from "react";

const NavBarContext = createContext();

export default function NavBarProvider(props) {
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [navClass, setNavClass] = useState("nav red");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [menuIndex, setMenuIndex] = useState("nav-menu hidden");
  const [toggleBurger, setToggleBurger] = useState(false);
  const [stickyCLass, setStickyClass] = useState(false);
  const [moveLogo, setMoveLogo] = useState("");
  const [toggleConnect, setToggleConnect] = useState(false);
  const [connectSlide, setConnectSlide] = useState("slide-out");

  useEffect(() => {
    const stickNavbar = () => {
      setStickyClass(window.scrollY > 10);
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
  const onClickSlide = function () {
    !toggleConnect ? setConnectSlide("slide-in") : setConnectSlide("slide-out");
    console.log("1");
    setToggleConnect(!toggleConnect);
    console.log(toggleConnect);
  };
  return (
    <NavBarContext.Provider
      value={{
        burgerClass: burgerClass,
        navClass: navClass,
        menuClass: menuClass,
        menuIndex: menuIndex,
        stickyCLass: stickyCLass,
        moveLogo: moveLogo,
        connectSlide: connectSlide,
        onClickToggle: onClickToggle,
        onClickSlide: onClickSlide,
      }}
    >
      {props.children}
    </NavBarContext.Provider>
  );
}

export function useNavBarProvider() {
  const value = useContext(NavBarContext);
  return value;
}
