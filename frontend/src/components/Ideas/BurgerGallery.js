import axios from "axios";
import React, { useEffect, useState } from "react";

export default function BurgerGallery() {
  const [burgers, setBurgers] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:9001/burgers")
      .then((res) => {
        setBurgers(res.data);
      })
      .catch((err) => {
        setErr("Impossible de charger les données");
      });
  }, []);
  return (
    <section className="burger-gallery-container">
      {burgers.map((oneBurger) => (
        <article className={"burger-card"}>
          <img
            src={`http://localhost:9001/assets/img/${oneBurger.image.src}`}
            alt={oneBurger.image.alt}
          />
          <h2>{oneBurger.name}</h2>
          <section className="burger-description">
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
          </section>
        </article>
      ))}
    </section>
  );
}
