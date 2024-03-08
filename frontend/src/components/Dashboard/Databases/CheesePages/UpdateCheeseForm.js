import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import token from "../../../../context/token";
import { motion } from "framer-motion";

const UpdateCheeseForm = () => {
  const [cheese, setCheese] = useState([]);

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
      .get(`${process.env.REACT_APP_BASE_URL}/custom/cheese/${id}`)
      .then((res) => {
        setCheese(res.data);
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
        .put(`${process.env.REACT_APP_BASE_URL}/custom/cheese/${id}`, inputs, {
          headers: token(),
        })
        .then(() => {
          navigate(`/custom/cheese/${id}`);
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
      <h2>Update this cheese:</h2>

      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            value={inputs.name}
            type="text"
            placeholder={`${cheese ? cheese.name : "not working"}`}
            name="name"
            onChange={handleChange}
          />

          <input
            value={inputs.protein}
            type="number"
            placeholder={`${cheese ? cheese.protein : "not working"}`}
            size="25"
            name="protein"
            onChange={handleChange}
          />

          <input
            value={inputs.carbs}
            type="number"
            size="25"
            name="carbs"
            placeholder={`${cheese ? cheese.carbs : "not working"}`}
            onChange={handleChange}
          />
          <input
            value={inputs.fat}
            type="number"
            size="25"
            name="fat"
            placeholder={`${cheese ? cheese.fat : "not working"}`}
            onChange={handleChange}
          />

          <input
            value={inputs.calories}
            type="number"
            size="25"
            name="calories"
            placeholder={`${cheese ? cheese.calories : "not working"}`}
            onChange={handleChange}
          />
          <button className={"button-form"}>Validate</button>
        </form>
      </section>
    </motion.main>
  );
};

export default UpdateCheeseForm;
