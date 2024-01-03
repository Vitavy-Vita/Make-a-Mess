import React from "react";
import { useNavBarProvider } from "../../context/NavBarContext";
import NavBar from "../NavBar/NavBar";
import burger from "./images/burger.png";
import dude from "./images/dude.avif";
import Articles from "./Articles";
import MobileConnect from "../NavBar/MobileConnect";
import { CiForkAndKnife } from "react-icons/ci";
import { PiHamburgerLight } from "react-icons/pi";

export default function DisplayPage(props) {
  const value = useNavBarProvider();

  return (
    <div>
      <header className={`${value.stickyCLass ? "sticky" : ""}`}>
        <NavBar />
        <MobileConnect />
      </header>
      <h1 className="about-title">Who are we</h1>
      <section className={"article-container"}>
      <Articles
        image={burger}
        title={"Our Story"}
        alt={"image of a burger in broken down view"}
        icon={<CiForkAndKnife />}
        className={"left-article"}
      />
      <Articles
        image={dude}
        title={"What we do"}
        alt={"A man offering a burger in both hands"}
        icon={<PiHamburgerLight />}
        className={"right-article"}
        />
        </section>
    </div>
  );
}
