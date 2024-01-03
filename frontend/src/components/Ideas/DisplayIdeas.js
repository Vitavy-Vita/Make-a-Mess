import React from "react";
import { useNavBarProvider } from "../../context/NavBarContext";
import NavBar from "../NavBar/NavBar";
import Ideas from "./BurgerGallery";
import MobileConnect from "../NavBar/MobileConnect";
export default function DisplayPage(props) {
  const value = useNavBarProvider();

  return (
    <div>
      <header className={`${value.stickyCLass ? "sticky" : ""}`}>
        <NavBar />
        <MobileConnect/>
      </header>
      <Ideas />
    </div>
  );
}