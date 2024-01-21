import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const UserCard = () => {
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);
  return (
    <main className="user-card-container">
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
          <NavLink to={"/Settings/Admin"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </main>
  );
};

export default UserCard;