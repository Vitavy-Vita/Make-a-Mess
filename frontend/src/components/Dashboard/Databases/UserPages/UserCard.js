import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const UserCard = () => {
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((res) => {
        setErr(res.response.data.message);
      });
  }, []);

  return (
    <motion.section
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        mass: 7,
        damping: 50,
      }}
      className="user-card-container"
    >
      {user && (
        <article className="user-card">
          <figure
            role="img"
            aria-label="Profil picture of the user"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/assets/img/${user.image.src})`,
            }}
            className="premade-card-img"
          ></figure>
          <h2>{user.name}</h2>
          <p>Phone Number: {user.tel}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <NavLink to={"/Settings/Admin"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </motion.section>
  );
};

export default UserCard;
