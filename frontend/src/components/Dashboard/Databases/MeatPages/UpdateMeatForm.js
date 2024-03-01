import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import token from "../../../../context/token";
import { motion } from "framer-motion";

const UpdateMeatForm = () => {
  const [meat, setMeat] = useState();
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
      .get(`${process.env.REACT_APP_BASE_URL}/custom/meat/${id}`)
      .then((res) => {
        setMeat(res.data);
        setInputs(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmBox = window.confirm(
      "Are you sure you wish to make these changes ?"
    );
    if (confirmBox === true) {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/custom/meat/${id}`, inputs, {
          headers: token(),
        })
        .then(() => {
          navigate(`/custom/meat/${id}`);
        })
        .catch((res) => {
          setErr(res.data);
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
      <h1>Update this Meat:</h1>

      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            value={inputs.name}
            type="text"
            placeholder={`${meat ? meat.name : "not working"}`}
            name="name"
            onChange={handleChange}
          />

          <input
            value={inputs.protein}
            type="number"
            placeholder={`${meat ? meat.protein : "not working"}`}
            size="25"
            name="protein"
            onChange={handleChange}
          />

          <input
            value={inputs.carbs}
            type="number"
            size="25"
            name="carbs"
            placeholder={`${meat ? meat.carbs : "not working"}`}
            onChange={handleChange}
          />
          <input
            value={inputs.fat}
            type="number"
            size="25"
            name="fat"
            placeholder={`${meat ? meat.fat : "not working"}`}
            onChange={handleChange}
          />

          <input
            value={inputs.calories}
            type="number"
            size="25"
            name="calories"
            placeholder={`${meat ? meat.calories : "not working"}`}
            onChange={handleChange}
          />
          <button className={"button-form"}>Validate</button>
        </form>
      </section>
    </motion.main>
  );
};

export default UpdateMeatForm;
