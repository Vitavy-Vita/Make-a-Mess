import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:9001/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        setErr("Unable to load data");
      });
  }, []);
  return (
    <section>
      {users.map((oneUser) => (
        <article>
          <NavLink>{oneUser.name}</NavLink>
          <p>{oneUser.tel}</p>
          <p>{oneUser.email}</p>
        </article>
      ))}
    </section>
  );
};

export default UsersList;
