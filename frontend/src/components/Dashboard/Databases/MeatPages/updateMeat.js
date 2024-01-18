import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const UpdateMeat = () => {
  const [meats, setMeats] = useState();
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
      .get(`http://localhost:9001/custom/meat`)
      .then((res) => {
        setMeats(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, [meats]);
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
      .post("http://localhost:9001/custom/meat/new", inputs)
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
      "Do you really want to delete this meat ?"
    );
    if (confirmBox === true) {
      axios
        .delete(`http://localhost:9001/custom/meat/${id}`)
        .then((res) => {
          setMeats((allMeats) => allMeats.filter((meat) => meat.id !== id));
        })
        .catch((res) => {
          console.log(res.data);
          setErr("Not working");
        });
    }
  };
  return (
    <article>
      <h2>Create new Meat</h2>
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
      <h2>Existing Meat</h2>
      {meats && (
        <section>
          {meats.map((oneMeat) => (
            <article className="user-article-dashboard">
              <NavLink
                to={`/custom/meat/${oneMeat._id}`}
                className="user-dashboard"
              >
                {oneMeat.name}
              </NavLink>
              <button>Update</button>
              <button onClick={() => handleRemove(oneMeat._id)}>Delete</button>
            </article>
          ))}
        </section>
      )}
    </article>
  );
};

export default UpdateMeat;
