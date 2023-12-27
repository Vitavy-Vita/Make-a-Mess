import React from "react";
import { useNavBarProvider } from "../../context/NavBarContext";
import NavBar from "../NavBar/NavBar";
import MobileConnect from "../NavBar/MobileConnect";
import CreateAccount from "./CreateAccount";

export default function OnClickToggle(props) {
  const value = useNavBarProvider();

  return (
    <div>
      <div className={`${value.stickyCLass ? "sticky" : ""}`}>
        <NavBar />
        <MobileConnect />
      </div>
      <CreateAccount />
    </div>
  );
}
