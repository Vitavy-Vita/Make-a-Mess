import React from "react";
import { useBurgerProvider } from "../context/NavBarContext";
import NavBar from "./NavBar";
import Home from "./Home";


export default function OnClickToggle(props) {
  const value = useBurgerProvider();

  return (
    <div className={`${value.stickyCLass ? "sticky" : ""}`}>
      <NavBar />
      <Home />
    </div>
  );
}
