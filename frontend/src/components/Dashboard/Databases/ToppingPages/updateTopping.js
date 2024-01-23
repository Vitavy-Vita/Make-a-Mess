import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import token from "../../../../context/token";

const UpdateTopping = () => {
  const [toppings, setToppings] = useState([]);
  const [filteredTopping, setFilteredTopping]= useState([])
  const [inputs, setInputs] = useState({
    name: "",
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
  });
  const { id } = useParams();
  const [err, setErr] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9001/custom/topping`)
      .then((res) => {
        setToppings(res.data);
        setFilteredTopping(res.data)
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
      .post("http://localhost:9001/custom/topping/new", inputs, {
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
      "Do you really want to delete this topping ?"
    );
    if (confirmBox === true) {
      axios
        .delete(`http://localhost:9001/custom/topping/${id}`, {
          headers: token(),
        })
        .then((res) => {
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
    <article>
      <h2>Create new Topping</h2>
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
      <h2>Existing Toppings</h2>
      <form >
        <input type="text" placeholder="Search..." onChange={(e)=>handleSearch(e.target.value)}/>
      </form>
      {toppings && (
        <section>
          {toppings.map((oneTopping) => (
            <article className="user-article-dashboard">
              <NavLink
                to={`/custom/topping/${oneTopping._id}`}
                className="user-dashboard"
              >
                {oneTopping.name}
              </NavLink>
              <NavLink to={`/custom/topping/${oneTopping._id}/update`}>
                <button>Update</button>
              </NavLink>

              <button onClick={() => handleRemove(oneTopping._id)}>
                Delete
              </button>
            </article>
          ))}
          ;
        </section>
      )}
      <NavLink to={"/Settings/Admin"}>
        <button>Go Back</button>
      </NavLink>
    </article>
  );
};

export default UpdateTopping;
