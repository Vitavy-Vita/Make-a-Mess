import { motion } from "framer-motion";
import axios from "axios";
import React, { useRef, useEffect, useState } from "react";

export default function Ideas() {
  const [burgers, setBurgers] = useState([]);
  const [err, setErr] = useState();
  const [width, setWidth] = useState(0);

  const carousel = useRef();

  useEffect(() => {
    console.log("====================================");
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    console.log("====================================");
    axios
      .get("http://localhost:9001/burgers")
      .then((res) => {
        setBurgers(res.data);
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      })
      .catch((err) => {
        setErr("Impossible de charger les données");
      });
  }, []);

  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        mass: 7,
        damping: 50,
      }}
      className="ideas-main"
    >
      <section className="main-title">
        <h2>Here is a few pre-made</h2>
        <h1 className="burger">Burgers !!</h1>
      </section>
      <motion.section
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag={"x"}
          dragConstraints={{
            right: 0,
            left: -width,
          }}
          className="burger-gallery-container"
        >
          {burgers.map((oneBurger, i) => (
            <article className={"burger-card"} key={i}>
              <figure
                style={{
                  backgroundImage: `url(http://localhost:9001/assets/img/${oneBurger.image.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width:"400px",
                  height:"250px",
                  border: "3px solid white",
                  borderRadius:"15px",
                  
                }}
              ></figure>
              <h2>{oneBurger.name}</h2>
              <aside className="burger-description">
                <p>{oneBurger.description}</p>

                <ul>
                  <li>Protein:</li>
                  <li>Carbs:</li>
                  <li>Fat:</li>
                  <li>Calories:</li>
                </ul>
                <ul>
                  <li>{oneBurger.protein}g</li>
                  <li>{oneBurger.carbs}g</li>
                  <li>{oneBurger.fat}g</li>
                  <li>{oneBurger.calories}</li>
                </ul>
              </aside>
              <button>Add to Favorites</button>
            </article>
          ))}
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
