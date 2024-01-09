import Articles from "./Articles";
import { motion } from "framer-motion";
import burger from "./images/burger.png";
import dude from "./images/dude.avif";
import { CiForkAndKnife } from "react-icons/ci";
import { PiHamburgerLight } from "react-icons/pi";

export default function About() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{  y: window.innerWidth, transition: "1s"}}
    >
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
    </motion.main>
  );
}
