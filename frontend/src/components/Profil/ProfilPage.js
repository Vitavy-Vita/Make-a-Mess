import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { useAuth } from "../../context/authContext";
import token from "../../context/token";
import { motion } from "framer-motion";

const ProfilPage = () => {
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const auth = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users/${auth.user.id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/favorites`, { headers: token() })
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);

  const handleRemove = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this burger from your favorites ?"
    );
    if (confirmBox === true) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/favorites/${id}`, {
          headers: token(),
        })
        .then((res) => {
          setFavorites((allFav) => allFav.filter((fav) => fav._id !== id));
        })
        .catch((res) => {
          setErr("Not working");
        });
    }
  };

  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      className="user-card-container"
      transition={{
        type: "spring",
        stiffness: 300,
        mass: 7,
        damping: 50,
      }}
    >
      {user && (
        <section className="user-card">
          <figure
            style={{
              backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/assets/img/${user.image.src})`,
            }}
            className="premade-card-img"
          ></figure>
          <article>
            <h2>{user.name}</h2>
            <p>Phone Number: {user.tel}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </article>
          {err && <span>{err}</span>}
          {auth.user.role === "admin" && (
            <NavLink to={"/my-profil/update"}>
              <button>Update</button>
            </NavLink>
          )}
        </section>
      )}
      <section>
        <h2>My Favorites</h2>
        {favorites && (
          <div className="favorites-scroll">
            {favorites.map((oneFav, i) => (
              <article className={"burger-card"}>
                <h2>{oneFav.name}</h2>
                <aside className="burger-description">
                  <ul>
                    <li>{oneFav.ingredients}</li>
                  </ul>
                  <ul>
                    <li>Protein:</li>
                    <li>Carbs:</li>
                    <li>Fat:</li>
                    <li>Calories:</li>
                  </ul>
                  <ul>
                    <li>{oneFav.protein}g</li>
                    <li>{oneFav.carbs}g</li>
                    <li>{oneFav.fat}g</li>
                    <li>{oneFav.calories}</li>
                  </ul>
                </aside>
                <em>added on: {new Date(oneFav.date).toLocaleDateString()}</em>
                <button onClick={() => handleRemove(oneFav._id)}>Remove</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </motion.main>
  );
};

export default ProfilPage;
