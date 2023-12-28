import React from "react";
import { useNavBarProvider } from "../../context/NavBarContext";
import NavBar from "./NavBar";
import HomePage from "../HomePage/HomePage";
import MobileConnect from "./MobileConnect";

export default function OnClickToggle(props) {
  const value = useNavBarProvider();

  return (
    <div>
      <div className={`${value.stickyCLass ? "sticky" : ""}`}>
        <NavBar/>
        <MobileConnect />
      </div>
    </div>
  );
}
