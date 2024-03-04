import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import token from "../../context/token";
import { motion } from "framer-motion";
import { useAuth } from "../../context/authContext";


const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [reload, setReload] = useState(false);
  const [err, setErr] = useState();
  const [open, setOpen] = useState(null);
  const [response, setResponse] = useState();
  const auth = useAuth();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users`)
      .then((res) => {
        setUsers(res.data);
        setFilteredUser(res.data);
      })
      .catch((err) => {
        setErr("Cannot access data");
      });
      // we use a "fake" state to force a reload to the page each time we use the delete function to keep the updated array rendered
  }, [reload]);

  const handleRemove = (id) => {
    // admin deleting their account would be a security breach, if their are no more admins the site wouldnt be able to run properly, we prevent that by making sure the admin cannot delete his own account
    if (auth.user.id === id) {
      return setErr("Admin arent allowed to delete their own account");
    }

    const confirmBox = window.confirm(
      "Do you really want to delete this user ?"
    );

    if (confirmBox === true) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/users/${id}`, { headers: token() })
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
        .put(`${process.env.REACT_APP_BASE_URL}/users/${id}`, formData, {
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
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        mass: 7,
        damping: 50,
      }}
      className="main-dashboard"
    >
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
          {response && <span>{response}</span>}
          {err && <span>{err}</span>}
          <aside className="article-list-scroll">
            {users.map((oneUser, i) => (
              <article className="database-card" key={oneUser._id}>
                <NavLink
                  to={`/users/${oneUser._id}`}
                  className="user-dashboard"
                >
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
                <button onClick={() => handleRemove(oneUser._id)}>
                  Delete
                </button>
              </article>
            ))}
          </aside>
        </article>
      </section>
    </motion.main>
  );
};

export default DashboardAdmin;
