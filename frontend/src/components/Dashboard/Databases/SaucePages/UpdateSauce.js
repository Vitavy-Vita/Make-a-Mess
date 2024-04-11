import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import token from "../../../../context/token";
import { motion } from "framer-motion";

const UpdateSauce = () => {
  const [sauces, setSauces] = useState();
  const [filteredSauce, setFilteredSauce] = useState([]);
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
      .get(`${process.env.REACT_APP_BASE_URL}/custom/sauce`)
      .then((res) => {
        setSauces(res.data);
        setFilteredSauce(res.data);
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
      .post(`${process.env.REACT_APP_BASE_URL}/custom/sauce/new`, inputs, {
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
      "Do you really want to delete this sauce ?"
    );
    if (confirmBox === true) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/custom/sauce/${id}`, {
          headers: token(),
        })
        .then((res) => {
          setReload(!reload);
          setSauces((allSauce) => allSauce.filter((sauce) => sauce.id !== id));
        })
        .catch((res) => {
          console.log(res.data);
          setErr("Not working");
        });
    }
  };
  const handleSearch = (value) => {
    const searchResult = filteredSauce.filter((sauce) =>
      sauce.name.toLowerCase().includes(value.toLowerCase())
    );
    setSauces(searchResult);
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
        <h2>Create new sauce</h2>
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
      {sauces && (
        <article className="ingredient-wrapper">
          <h2>Existing sauce</h2>
          <form>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </form>
          <aside className="article-list-scroll">
            {sauces.map((onesauce) => (
              <article className="database-card">
                <NavLink
                  to={`/custom/sauce/${onesauce._id}`}
                  className="ingredient-name"
                >
                  {onesauce.name}
                </NavLink>
                <NavLink to={`/custom/sauce/${onesauce._id}/update`}>
                  <button> Update</button>
                </NavLink>

                <button onClick={() => handleRemove(onesauce._id)}>
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

export default UpdateSauce;
