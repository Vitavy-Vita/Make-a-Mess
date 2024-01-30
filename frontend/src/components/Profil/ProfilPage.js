import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
      .get(`http://localhost:9001/users/${auth.user.id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:9001/favorites`, { headers: token() })
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
        .delete(`http://localhost:9001/favorites/${id}`, {
          headers: token(),
        })
        .then((res) => {
          setFavorites((allFav) => allFav.filter((fav) => fav._id !== id));
        })
        .catch((res) => {
          console.log(res.data);
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
        <article className="user-card">
          <img
            src={`http://localhost:9001/assets/img/${user.image.src}`}
            alt={user.image.alt}
            className="premade-card-img"
          />
          <h2>{user.name}</h2>
          <p>Phone Number: {user.tel}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <NavLink to={"/"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
      {favorites && (
        <section>
          <h2>My Favorites</h2>
          {favorites.map((oneFav, i) => (
            <article className="ingredient-card" key={i}>
              <h3>{oneFav.name}</h3>
              <ul className="ingredient-list">
                <li>Protein:</li>
                <li>{oneFav.protein}</li>
                <li>Carbs:</li>
                <li>{oneFav.carbs}</li>
                <li onClick={() => handleRemove(oneFav._id)}>❌</li>
                <li>Fat:</li>
                <li>{oneFav.fat}</li>
                <li>Calories:</li>
                <li>{oneFav.calories}</li>
              </ul>
            </article>
          ))}
        </section>
      )}
    </motion.main>
  );
};

export default ProfilPage;
