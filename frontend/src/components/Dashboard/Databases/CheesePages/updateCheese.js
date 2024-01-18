import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const UpdateCheese = () => {
  const [cheeses, setCheeses] = useState();
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
      .get(`http://localhost:9001/custom/cheese`)
      .then((res) => {
        setCheeses(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, [cheeses]);

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
      .post("http://localhost:9001/custom/cheese/new", inputs)
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
      "Do you really want to delete this cheese ?"
    );
    if (confirmBox === true) {
      axios
        .delete(`http://localhost:9001/custom/cheese/${id}`)
        .then((res) => {
          setCheeses((allCheeses) =>
            allCheeses.filter((cheese) => cheese.id !== id)
          );
        })
        .catch((res) => {
          console.log(res.data);
          setErr("Not working");
        });
    }
  };
  return (
    <article>
      <h2>Create new Cheese</h2>
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
      <h2>Existing Cheese</h2>
      {cheeses && (
        <section>
          {cheeses.map((oneCheese) => (
            <article className="user-article-dashboard">
              <NavLink
                to={`/custom/cheese/${oneCheese._id}`}
                className="user-dashboard"
              >
                {oneCheese.name}
              </NavLink>
              <button>Update</button>
              <button onClick={() => handleRemove(oneCheese._id)}>
                Delete
              </button>
            </article>
          ))}
        </section>
      )}
    </article>
  );
};

export default UpdateCheese;
