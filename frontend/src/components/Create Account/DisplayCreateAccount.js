import React from "react";
import { useNavBarProvider } from "../../context/NavBarContext";
import NavBar from "../NavBar/NavBar";
import CreateForm from "../Create Account/CreateForm";

export default function OnClickToggle(props) {
  const value = useNavBarProvider();

  return (
    <div>
      <div className={`${value.stickyCLass ? "sticky" : ""}`}>
        <NavBar />
        
      </div>
      <CreateForm />
    </div>
  );
}
