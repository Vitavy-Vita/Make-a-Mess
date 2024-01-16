import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/users/${id}`)
      .then((res) => {
        console.log(res.data.message);
        setUser(res.data);
      })
      .catch((res) => {
        console.log(res.data.message);
        setErr(res.data);
      });
  }, []);
  return (
    <main className="user-card-container">
      {user && (
        <article className="user-card">
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

export default UserPage;
