import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import token from "../../../../context/token";
import { motion } from "framer-motion";

const UpdateBreadForm = () => {
  const [bread, setBread] = useState();
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
      .get(`${process.env.REACT_APP_BASE_URL}/custom/bread/${id}`, {
        headers: token(),
      })
      .then((res) => {
        setBread(res.data);
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
      // axios method put will replace on the targeted element the inputs we've entered
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/custom/bread/${id}`, inputs, {
          headers: token(),
        })
        .then(() => {
          // useNavigate from react-router-dom to redirect the user once the action has succeeded
          navigate(`/custom/bread/${id}`);
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
      <h2>Update this bread:</h2>

      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            value={inputs.name}
            type="text"
            placeholder={`${bread ? bread.name : "not working"}`}
            name="name"
            onChange={handleChange}
          />

          <input
            value={inputs.protein}
            type="number"
            placeholder={`${bread ? bread.protein : "not working"}`}
            size="25"
            name="protein"
            onChange={handleChange}
          />

          <input
            value={inputs.carbs}
            type="number"
            size="25"
            name="carbs"
            placeholder={`${bread ? bread.carbs : "not working"}`}
            onChange={handleChange}
          />
          <input
            value={inputs.fat}
            type="number"
            size="25"
            name="fat"
            placeholder={`${bread ? bread.fat : "not working"}`}
            onChange={handleChange}
          />

          <input
            value={inputs.calories}
            type="number"
            size="25"
            name="calories"
            placeholder={`${bread ? bread.calories : "not working"}`}
            onChange={handleChange}
          />
          <button className={"button-form"}>Validate</button>
        </form>
      </section>
    </motion.main>
  );
};

export default UpdateBreadForm;
