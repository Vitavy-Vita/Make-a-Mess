import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import token from "../../../../context/token";
import { motion } from "framer-motion";

const UpdateBread = () => {
  const [breads, setBreads] = useState([]);
  const [filteredBread, setFilteredBread] = useState([]);
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
    // axios request on get method to access data from the selected api
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/custom/bread`)
      // we fill our states with those data provided by the api
      .then((res) => {
        setBreads(res.data);
        setFilteredBread(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
      // use the dependency to refresh the page everytime the reload states is updated
  }, [reload]);

  const handleChange = (e) => {
    // destructuring, we extract the name and value from the "target" property of the event object "e"
    const { name, value } = e.target;
    // we spread the initial values of inputs (wich we decide to have empty) and override the property "name" with the value (value being what's typed inside the input). 
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
// axios this time with the method post, because we want to inject those inputs in our collection to create a new document.
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/custom/bread/new`, inputs, {
        // not everyone is allowed to post in database, setting the headers with the token is a way to confirm who's posting.
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
        setResponse("bread created");
      })
      .catch((res) => {
        setErr(res.response.data.message);
      });
  };

  const handleRemove = (id) => {
    // miss-clicks happen, we make sure that click was volontary
    const confirmBox = window.confirm(
      "Do you really want to delete this bread ?"
    );
    if (confirmBox === true) {
      // axios method delete, we use dynamicaly the id as a parameter to the function to target the correct element
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/custom/bread/${id}`, {
          headers: token(),
        })
        .then((res) => {
          // quick filter method to set bread array to display all bread without the bread of the id we chose
          setBreads((allBreads) =>
          allBreads.filter((bread) => bread.id !== id)
          );
          // we set reload to its opposite, just to handle the rendering of the page, wich means each time an element is removed, since we've put reload as a dependency of the useEffect, the page refresh with the new array of, in this case, "bread".
          setReload(!reload);
        })
        .catch((res) => {
          setErr("Not working");
        });
    }
  };

  const handleSearch = (value) => {
    // inside the filteredBread array, we look for the value entered in the input, if its the same as the name of the bread, returns an Array of this value
    const searchResult = filteredBread.filter((bread) =>
      bread.name.toLowerCase().includes(value.toLowerCase())
    );
    // we fill our state with the value entered (again everytime updated with each keychanges since we've put setBreads in a useEffect)
    setBreads(searchResult);
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
        <h2>Create new Bread</h2>
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
      {breads && (
        <article className="ingredient-wrapper">
          <h2>Existing Bread</h2>
          <form>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </form>
          <aside className="article-list-scroll">
            {breads.map((oneBread) => (
              <article className="database-card">
                <NavLink
                  to={`/custom/bread/${oneBread._id}`}
                  className="ingredient-name"
                >
                  {oneBread.name}
                </NavLink>
                <NavLink to={`/custom/bread/${oneBread._id}/update`}>
                  <button> Update</button>
                </NavLink>

                <button onClick={() => handleRemove(oneBread._id)}>
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

export default UpdateBread;
