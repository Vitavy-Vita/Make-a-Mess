import React from "react";
import { useNavBarProvider } from "../../context/NavBarContext";
import NavBar from "../NavBar/NavBar";
import LoginForm from "./LoginForm";

export default function DisplayPage(props) {
  const value = useNavBarProvider();

  return (
    <div>
      <div className={`${value.stickyCLass ? "sticky" : ""}`}>
        <NavBar />
      </div>
      <LoginForm />
    </div>
  );
}
