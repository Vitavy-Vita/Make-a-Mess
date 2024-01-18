import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState();
  const id = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:9001/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        setErr("Cannot access data");
      });
  }, [users]);

  const handleRemove = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this user ?"
    );
    if (confirmBox === true) {
      axios
        .delete(`http://localhost:9001/users/${id}`)
        .then((res) => {
          setUsers((allUsers) => allUsers.filter((user) => user.id !== id));
        })
        .catch((res) => {
          console.log(res.data);
          setErr("Not working");
        });
    }
  };

  return (
    <main className="main-dashboard">
      <h1>Dashboard</h1>
      <section className="article-container">
        <article className="database-container">
          <h2>Databases:</h2>
          <NavLink to={"/update/bread"}>Bread</NavLink>
          <NavLink to={"/update/cheese"}>Cheese</NavLink>
          <NavLink to={"/update/meat"}>Meat</NavLink>
          <NavLink to={"/update/sauce"}>Sauce</NavLink>
          <NavLink to={"/update/topping"}>Topping</NavLink>
          <NavLink to={"/burgers/new"}>Pre-Made</NavLink>
        </article>
        <article>
          <h2>Users:</h2>
          {users.map((oneUser) => (
            <article className="user-article-dashboard">
              <NavLink to={`/users/${oneUser._id}`} className="user-dashboard">
                {oneUser.name}
              </NavLink>
              <NavLink to={`/users/${oneUser._id}/update`}>
                <button>Update</button>
              </NavLink>

              <button onClick={() => handleRemove(oneUser._id)}>Delete</button>
            </article>
          ))}
        </article>
      </section>
    </main>
  );
};

export default DashboardAdmin;
