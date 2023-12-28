import { createContext, useContext, useState, useEffect } from "react";

const NavBarContext = createContext();

export default function NavBarProvider(props) {
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [navClass, setNavClass] = useState("nav red");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [menuIndex, setMenuIndex] = useState("nav-menu hidden");
  const [connectSlide, setConnectSlide] = useState("slide-out");
  const [moveLogo, setMoveLogo] = useState("");
  const [toggleBurger, setToggleBurger] = useState(false);
  const [stickyCLass, setStickyClass] = useState(false);
  const [toggleConnect, setToggleConnect] = useState(false);

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
    setToggleConnect(!toggleConnect);
  };
  return (
    <NavBarContext.Provider
      value={{
        burgerClass,
        navClass,
        menuClass,
        menuIndex,
        stickyCLass,
        moveLogo,
        connectSlide,
        onClickToggle,
        onClickSlide,
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
