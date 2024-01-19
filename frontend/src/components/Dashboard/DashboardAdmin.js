import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const [response, setResponse] = useState();
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
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const handleMenu = (e, id) => {
    const formData = new FormData();

    formData.append("role", e.target.value);
    const confirmBox = window.confirm(
      "Are you sure you wish to make these changes ?"
    );
    if (confirmBox === true) {
      axios
        .put(`http://localhost:9001/users/${id}`, formData)
        .then((res) => {
          setResponse("Role modified");
        })
        .catch((res) => {
          setErr(res.data);
        });
      setOpen(false);
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

              <form className="dropdown" encType="multipart/form-data">
                <button onClick={handleOpen}>Role:</button>
                {open ? (
                  <ul className="drowpdown-menu">
                    <li>
                      <button
                        onClick={(e) => handleMenu(e, oneUser._id)}
                        value="user"
                      >
                        User
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => handleMenu(e, oneUser._id)}
                        value="admin"
                      >
                        Admin
                      </button>
                    </li>
                  </ul>
                ) : null}
              </form>
              <button onClick={() => handleRemove(oneUser._id)}>Delete</button>
            </article>
          ))}
          {response && <span>{response}</span>}
        </article>
      </section>
    </main>
  );
};

export default DashboardAdmin;
