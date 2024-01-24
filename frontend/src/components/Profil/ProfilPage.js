import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const ProfilPage = () => {
  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  const auth = useAuth()

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
            <NavLink to={"/"}>
              <button>Go Back</button>
            </NavLink>
          </article>
        )}
        <h2>My Favorites</h2>
      </main>
    );
};

export default ProfilPage;