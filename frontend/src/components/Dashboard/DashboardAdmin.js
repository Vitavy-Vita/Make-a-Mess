import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import token from "../../context/token";
const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [reload, setReload] = useState(false);
  const [err, setErr] = useState();
  const [open, setOpen] = useState(null);
  const [response, setResponse] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:9001/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUser(res.data);
      })
      .catch((err) => {
        setErr("Cannot access data");
      });
  }, [reload]);

  const handleRemove = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this user ?"
    );
    if (confirmBox === true) {
      axios
        .delete(`http://localhost:9001/users/${id}`, { headers: token() })
        .then((res) => {
          setReload(!reload);
          setUsers((allUsers) => allUsers.filter((user) => user.id !== id));
        })
        .catch((res) => {
          setReload(!reload);
          setErr("Not working");
        });
    }
  };
  const handleOpen = (e, id) => {
    e.preventDefault();
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  };

  const handleMenu = (e, id) => {
    const formData = new FormData();

    formData.append("role", e.target.value);
    const confirmBox = window.confirm(
      "Are you sure you wish to make these changes ?"
    );
    if (confirmBox === true) {
      axios
        .put(`http://localhost:9001/users/${id}`, formData, {
          headers: token(),
        })
        .then((res) => {
          setResponse("Role modified");
        })
        .catch((res) => {
          setErr(res.data);
        });
      setOpen(null);
    }
  };

  const handleSearch = (value) => {
    const searchResult = filteredUser.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(searchResult);
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
        <article className="users-container">
          <h2>Users:</h2>
          <form>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </form>
          {users.map((oneUser, i) => (
            <article className="user-article-dashboard" key={oneUser._id}>
              <NavLink to={`/users/${oneUser._id}`} className="user-dashboard">
                {oneUser.name}
              </NavLink>

              <form className="dropdown" encType="multipart/form-data">
                <button onClick={(e) => handleOpen(e, oneUser._id)}>
                  Role:
                </button>
                {open === oneUser._id ? (
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
