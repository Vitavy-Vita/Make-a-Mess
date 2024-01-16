import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


const UpdateBurgerGallery = () => {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0,
  });
  const [preMade, setPreMade] = useState()
  const [err, setErr] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9001/burgers`)
      .then((res) => {
        
        setPreMade(res.data);
      })
      .catch((res) => {
        
        setErr(res.data);
      });
  }, []);

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
      inputs.protein <= 0 ||
      inputs.carbs <= 0 ||
      inputs.fat <= 0 ||
      inputs.calories <= 0
    ) {
      return setErr("Please provide all informations");
    }
    const formData = new FormData();

    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("protein", inputs.protein);
    formData.append("carbs", inputs.carbs);
    formData.append("fat", inputs.fat);
    formData.append("calories", inputs.calories);
    formData.append("image", inputs.image);
    axios
      // .post("http://yohannrousseau.3wa.io:9001",inputs)
      .post("http://localhost:9001/burgers/new", formData)
      .then((res) => {
        setInputs({
          ...inputs,
          name: "",
          description: "",
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
  return (
    <article>
      <h2>Create new Burger</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="image" id="image" onChange={handleChange} />
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
        <button className={"button-form"}>Validate</button>
      </form>
      {err && <span>{err}</span>}
      {response && <span>{response}</span>}
      <h2>Existing Burgers:</h2>
      {preMade && (
                <section>
                {preMade.map((onePreMade) => (
                  <article className="user-article-dashboard">
                    <NavLink to={`/burgers/${onePreMade._id}`} className="user-dashboard">
                      {onePreMade.name}
                    </NavLink>
                    <button>Update</button>
                    <button>Delete</button>
                  </article>
                ))}
              </section>
      )}
    </article>
  );
};

export default UpdateBurgerGallery;