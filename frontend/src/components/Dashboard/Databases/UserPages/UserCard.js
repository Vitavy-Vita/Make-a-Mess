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
    <motion.main
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
        <section className="user-card">
          <figure
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
        </section>
      )}
    </motion.main>
  );
};

export default UserCard;
