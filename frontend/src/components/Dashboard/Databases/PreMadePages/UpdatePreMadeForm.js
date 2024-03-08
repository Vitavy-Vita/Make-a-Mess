import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import token from "../../../../context/token";
import { motion } from "framer-motion";
const UpdatePreMadeForm = () => {
  const [preMade, setPreMade] = useState();
  const [err, setErr] = useState();
  const [inputs, setInputs] = useState({
    name: "",
    protein: "",
    carbs: "",
    fat: "",
    calories: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/burgers/${id}`)
      .then((res) => {
        setPreMade(res.data);
        setInputs(res.data);
      })
      .catch((res) => {
        setErr("error");
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
    const confirmBox = window.confirm(
      "Are you sure you wish to make these changes ?"
    );
    if (confirmBox === true) {
      const formData = new FormData();

      formData.append("name", inputs.name);
      formData.append("description", inputs.description);
      formData.append("protein", inputs.protein);
      formData.append("carbs", inputs.carbs);
      formData.append("fat", inputs.fat);
      formData.append("calories", inputs.calories);
      formData.append("image", inputs.image);
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/burgers/${id}`, formData, {
          headers: token(),
        })
        .then(() => {
          navigate(`/burgers/${id}`);
        })
        .catch((res) => {
          setErr(res.response.data.message);
        });
    }
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
      className="center-container"
    >
      <h2>Update this Burger:</h2>

      <section className="form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            value={inputs.name}
            type="text"
            placeholder={`${preMade ? preMade.name : "not working"}`}
            name="name"
            onChange={handleChange}
          />
          <textarea
            value={inputs.description}
            onChange={handleChange}
            name="description"
            id="description"
            cols="20"
            rows="10"
            placeholder="Description:"
            required
          />
          <input
            value={inputs.protein}
            type="number"
            placeholder={`${preMade ? preMade.protein : "not working"}`}
            size="25"
            name="protein"
            onChange={handleChange}
          />

          <input
            value={inputs.carbs}
            type="number"
            size="25"
            name="carbs"
            placeholder={`${preMade ? preMade.carbs : "not working"}`}
            onChange={handleChange}
          />
          <input
            value={inputs.fat}
            type="number"
            size="25"
            name="fat"
            placeholder={`${preMade ? preMade.fat : "not working"}`}
            onChange={handleChange}
          />

          <input
            value={inputs.calories}
            type="number"
            size="25"
            name="calories"
            placeholder={`${preMade ? preMade.calories : "not working"}`}
            onChange={handleChange}
          />
          <input type="file" name="image" id="image" onChange={handleChange} />
          <button className={"button-form"}>Validate</button>
        </form>
        {err && <span>{err}</span>}
      </section>
    </motion.main>
  );
};

export default UpdatePreMadeForm;
