import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import token from "../../../../context/token";
import { motion } from "framer-motion";

const UpdatePreMade = () => {
  const [preMade, setPreMade] = useState([]);
  const [filteredPreMade, setFilteredPreMade] = useState([]);
  const [reload, setReload] = useState(false);
  const [err, setErr] = useState("");
  const [response, setResponse] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    protein: "",
    carbs: "",
    fat: "",
    calories: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:9001/burgers`)
      .then((res) => {
        setPreMade(res.data);
        setFilteredPreMade(res.data);
      })
      .catch((res) => {
        setErr(res.response.data.message);
      });
  }, [reload]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setInputs({ ...inputs, image: files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
    setErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.name.trim() === "" ||
      inputs.description.trim() === "" ||
      inputs.protein < 0 ||
      inputs.carbs < 0 ||
      inputs.fat < 0 ||
      inputs.calories < 0
    ) {
      return setErr("Please provide all informations");
    }
    // when a file is involved, sending inputs states directly will not work, this is were the FormData comes into place, making it easy to create key-value pairs of inputs fields of wichever type.
    const formData = new FormData();
    // it requires to use the javascrypt method append
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("protein", inputs.protein);
    formData.append("carbs", inputs.carbs);
    formData.append("fat", inputs.fat);
    formData.append("calories", inputs.calories);
    formData.append("image", inputs.image);
    axios
      // .post("http://yohannrousseau.3wa.io:9001",inputs)
      // we then post formData instead of inputs
      .post("http://localhost:9001/burgers/new", formData, { headers: token() })
      .then((res) => {
        setReload(!reload);
        setInputs({
          ...inputs,
          name: "",
          description: "",
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
      "Do you really want to delete this burger ?"
    );
    if (confirmBox === true) {
      axios
        .delete(`http://localhost:9001/burgers/${id}`, { headers: token() })
        .then((res) => {
          setReload(!reload);
          setPreMade((allPreMade) =>
            allPreMade.filter((preMade) => preMade.id !== id)
          );
        })
        .catch((res) => {
          setErr("Not working");
        });
    }
  };
  const handleSearch = (value) => {
    const searchResult = filteredPreMade.filter((preMade) =>
      preMade.name.toLowerCase().includes(value.toLowerCase())
    );
    setPreMade(searchResult);
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
        <h2>Create new Burger</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            value={inputs.name}
            type="text"
            placeholder="Name:"
            size="25"
            name="name"
            onChange={handleChange}
            required
          />
          <textarea
            value={inputs.description}
            onChange={handleChange}
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Description:"
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
          <input type="file" name="image" id="image" onChange={handleChange} />
          <button className={"button-form"}>Validate</button>
        </form>
        {err && <span>{err}</span>}
        {response && <span>{response}</span>}
      </article>
      {preMade && (
        <article className="ingredient-wrapper">
          <h2>Existing Burgers:</h2>
          <form>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </form>

          <aside className="article-list-scroll">
            {preMade.map((onePreMade) => (
              <article className="database-card">
                <NavLink
                  to={`/burgers/${onePreMade._id}`}
                  className="ingredient-name"
                >
                  {onePreMade.name}
                </NavLink>
                <NavLink to={`/burgers/${onePreMade._id}/update`}>
                  <button>Update</button>
                </NavLink>
                <button onClick={() => handleRemove(onePreMade._id)}>
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

export default UpdatePreMade;
