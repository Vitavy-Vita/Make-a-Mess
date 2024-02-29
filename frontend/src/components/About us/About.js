import { motion } from "framer-motion";
import Button from "../NavBar/Button";
import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        type: "spring",
        stiffness: 500,
        mass: 1,
        damping: 100,
      }}
      className="about-container"
    >
      <section className={"about-container"}>
        <article>
          <h2>What we do</h2>
          <motion.iframe
            aria-label="video"
            src="https://www.youtube.com/embed/ulhRORJpuBM?si=Uub0j2n_zNA09Jos"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
            allowfullscreen
          ></motion.iframe>
        </article>
        <article>
          <h2 className="article-section-title">Who we are</h2>
          <ul className="article-section">
            <li>
              At Make-a-Mess, we care for your craving of good
              <strong> burgers</strong> just as much as your health!
            </li>
            <li>
              Thats why we propose to you the options to check for your macros
              before getting that juicy burger!
            </li>
            <li>
              You can check-out our selection of premade&nbsp;
              <NavLink to={"/ideas"}>
                <strong>burgers</strong>
              </NavLink>{" "}
              and even make your own if you choose to join us and create your
              account!
            </li>
            <Button />
          </ul>
        </article>
      </section>
    </motion.main>
  );
}
