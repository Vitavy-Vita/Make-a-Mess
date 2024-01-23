import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import token from "../../../../context/token";

const UpdateSauce = () => {
  const [sauces, setSauces] = useState();
  const [filteredSauce, setFilteredSauce] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
  });

  const [err, setErr] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9001/custom/sauce`)
      .then((res) => {
        setSauces(res.data);
        setFilteredSauce(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.name.trim() === "" ||
      inputs.protein <= 0 ||
      inputs.carbs <= 0 ||
      inputs.fat <= 0 ||
      inputs.calories <= 0
    ) {
      return setErr("Please provide all informations");
    }

    axios
      // .post("http://yohannrousseau.3wa.io:9001",inputs)
      .post("http://localhost:9001/custom/sauce/new", inputs, {
        headers: token(),
      })
      .then((res) => {
        setInputs({
          ...inputs,
          name: "",
          protein: 0,
          carbs: 0,
          fat: 0,
          calories: 0,
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
        .delete(`http://localhost:9001/custom/sauce/${id}`, {
          headers: token(),
        })
        .then((res) => {
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
    <article>
      <h2>Create new Sauce</h2>
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
        <button className={"button-form"}>Validate</button>
      </form>
      {err && <span>{err}</span>}
      {response && <span>{response}</span>}
      <h2>Existing Sauces</h2>
      <form>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
      {sauces && (
        <section>
          {sauces.map((oneSauce) => (
            <article className="user-article-dashboard">
              <NavLink
                to={`/custom/sauce/${oneSauce._id}`}
                className="user-dashboard"
              >
                {oneSauce.name}
              </NavLink>
              <NavLink to={`/custom/sauce/${oneSauce._id}/update`}>
                <button>Update</button>
              </NavLink>
              <button onClick={() => handleRemove(oneSauce._id)}>Delete</button>
            </article>
          ))}
        </section>
      )}
      <NavLink to={"/Settings/Admin"}>
        <button>Go Back</button>
      </NavLink>
    </article>
  );
};

export default UpdateSauce;
