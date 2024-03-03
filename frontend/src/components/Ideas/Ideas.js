import { motion } from "framer-motion";
import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import token from "../../context/token";
import { useNavigate } from "react-router-dom";
import favoriteBurger from "../../assets/images/favorite-burger.png";
import { useAuth } from "../../context/authContext";

export default function Ideas() {
  const [burgers, setBurgers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [err, setErr] = useState();
  const [width, setWidth] = useState(0);

  const isDesktop = useMediaQuery("(min-width: 991px)");
  // contrary to states, ref does not cause a re-render, we can then use the mutable object ref provides to update the current "state" of carousel. We use this information to target the movement of the carousel.
  const carousel = useRef();
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/burgers`)
      .then((res) => {
        setBurgers(res.data);

        // scrollWidth = total scroll distance necessary
        // offsetWidth = the actual size of the visible portion of the carousel
        // subtract them to create a usable and dynamical breakpoint for the left property of dragConstraints using the width state.
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      })
      .catch((err) => {
        setErr("Unable to get burgers list");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/favorites`, { headers: token() })
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((err) => {
        setErr("Unable to get favorite list");
      });
  }, []);

  const variants = isDesktop
    ? {
        drag: "x",
        dragConstraints: {
          right: 0,
          left: -width,
        },
      }
    : {};

  const addToFavorites = (burger) => {
    const { user, description, name, protein, carbs, fat, calories } = burger;
    // filter will always go through the whole array, find or some are quicker method to return the information needed
    if (favorites.find((fav) => fav.name === burger.name)) {
      return setErr("Cant add the same burger twice");
    }

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/favorites`,
        {
          user,
          name,
          ingredients: [description],
          protein,
          carbs,
          fat,
          calories,
        },
        {
          headers: token(),
        }
      )
      .then((res) => {
        navigate("/my-profil");
      })
      .catch((res) => {
        setErr(res.response.data.message);
      });
  };
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
      {auth.user && err && <span>{err}</span>}
      <motion.section
        aria-label="carousel"
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          {...variants}
          className="burger-gallery-container"
          whileDrag={() => setErr("")}
        >
          {burgers.map((oneBurger, i) => (
            <article className={"burger-card"} key={i}>
              <figure
                role="img"
                aria-label="Image of a burger"
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/assets/img/${oneBurger.image.src})`,
                }}
                className="burger-picture"
              ></figure>
              <h2
                style={{
                  position: "relative",
                }}
              >
                {oneBurger.name}
                {favorites.some((fav) => fav.name === oneBurger.name) && (
                  <img
                    src={favoriteBurger}
                    alt="favorite logo"
                    style={{
                      width: "50px",
                      position: "absolute",
                      top: "-30px",
                    }}
                  />
                )}
              </h2>

              <aside className="burger-description">
                <ul>
                  <li>{oneBurger.description}</li>
                </ul>
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

              {auth.user && (
                <button onClick={() => addToFavorites(oneBurger)}>
                  Add to Favorites
                </button>
              )}
            </article>
          ))}
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
