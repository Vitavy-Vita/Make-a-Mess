import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import token from "../../../../context/token";
import { motion } from "framer-motion";

const UpdateTopping = () => {
  const [toppings, setToppings] = useState([]);
  const [filteredTopping, setFilteredTopping] = useState([]);
  const [reload, setReload] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    protein: "",
    carbs: "",
    fat: "",
    calories: "",
  });

  const [err, setErr] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/custom/topping`)
      .then((res) => {
        setToppings(res.data);
        setFilteredTopping(res.data);
      })
      .catch((res) => {
        setErr(res.response.data.message);
      });
  }, [reload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.name.trim() === "" ||
      inputs.protein < 0 ||
      inputs.carbs < 0 ||
      inputs.fat < 0 ||
      inputs.calories < 0
    ) {
      return setErr("Please provide all informations");
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/custom/topping/new`, inputs, {
        headers: token(),
      })
      .then((res) => {
        setReload(!reload);
        setInputs({
          ...inputs,
          name: "",
          protein: "",
          carbs: "",
          fat: "",
          calories: "",
        });
        setResponse(res.data.message);
      })
      .catch((err) => {
        setErr(err);
      });
  };

  const handleRemove = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this topping ?"
    );
    if (confirmBox === true) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/custom/topping/${id}`, {
          headers: token(),
        })
        .then((res) => {
          setReload(!reload);
          setToppings((allTopping) =>
            allTopping.filter((topping) => topping.id !== id)
          );
        })
        .catch((res) => {
          console.log(res.data);
          setErr("Not working");
        });
    }
  };

  const handleSearch = (value) => {
    const searchResult = filteredTopping.filter((topping) =>
      topping.name.toLowerCase().includes(value.toLowerCase())
    );
    setToppings(searchResult);
  };

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
      className="ingredient-container"
    >
      <article>
        <h2>Create new topping</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={inputs.name}
            type="text"
            placeholder="Name:"
            size="25"
            name="name"
            onChange={handleChange}
            required
          />

          <input
            value={inputs.protein}
            onChange={handleChange}
            type="number"
            placeholder="Protein:"
            size="25"
            name="protein"
            required
          />

          <input
            value={inputs.carbs}
            onChange={handleChange}
            type="number"
            placeholder="Carbs:"
            size="25"
            name="carbs"
            required
          />

          <input
            value={inputs.fat}
            onChange={handleChange}
            type="number"
            placeholder="Fat:"
            size="25"
            name="fat"
            required
          />

          <input
            value={inputs.calories}
            onChange={handleChange}
            type="number"
            placeholder="Calories:"
            size="25"
            name="calories"
            required
          />
          <button>Validate</button>
        </form>
        {err && <span>{err}</span>}
        {response && <span>{response}</span>}
      </article>
      {toppings && (
        <article className="ingredient-wrapper">
          <h2>Existing topping</h2>
          <form>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </form>
          <aside className="article-list-scroll">
            {toppings.map((onetopping) => (
              <article className="database-card">
                <NavLink
                  to={`/custom/topping/${onetopping._id}`}
                  className="ingredient-name"
                >
                  {onetopping.name}
                </NavLink>
                <NavLink to={`/custom/topping/${onetopping._id}/update`}>
                  <button> Update</button>
                </NavLink>

                <button onClick={() => handleRemove(onetopping._id)}>
                  Delete
                </button>
              </article>
            ))}
          </aside>
        </article>
      )}

      <NavLink to={"/Settings/Admin"} className={"go-back-button "}>
        <button> Go Back</button>
      </NavLink>
    </motion.section>
  );
};

export default UpdateTopping;
