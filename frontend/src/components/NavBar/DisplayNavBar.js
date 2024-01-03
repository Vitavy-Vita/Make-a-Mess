import React from "react";
import { useNavBarProvider } from "../../context/NavBarContext";
import NavBar from "./NavBar";
import MobileConnect from "./MobileConnect";
import HomePage from "../HomePage/HomePage";

export default function DisplayPage(props) {
  const value = useNavBarProvider();

  return (
    <section>
      <header className={`${value.stickyCLass ? "sticky" : ""}`}>
        <NavBar />
        <MobileConnect />
      </header>
      <HomePage />
    </section>
  );
}
