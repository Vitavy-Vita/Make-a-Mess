import React from "react";
import { useNavBarProvider } from "../../context/NavBarContext";
import NavBar from "../NavBar/NavBar";
import CreateForm from "../Create Account/CreateForm";

export default function DisplayPage(props) {
  const value = useNavBarProvider();

  return (
    <div>
      <header className={`${value.stickyCLass ? "sticky" : ""}`}>
        <NavBar />
        
      </header>
      <CreateForm />
    </div>
  );
}
