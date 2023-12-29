import React from "react";
import { useNavBarProvider } from "../../context/NavBarContext";
import NavBar from "../NavBar/NavBar";
import Ideas from "./BurgerGallery";
import MobileConnect from "../NavBar/MobileConnect";
export default function DisplayPage(props) {
  const value = useNavBarProvider();

  return (
    <div>
      <div className={`${value.stickyCLass ? "sticky" : ""}`}>
        <NavBar />
        <MobileConnect/>
      </div>
      <Ideas />
    </div>
  );
}