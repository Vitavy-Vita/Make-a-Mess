import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import token from "../../../../context/token"
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
      .get(`http://localhost:9001/custom/bread/${id}`, {headers:token()})
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
      axios
        .put(`http://localhost:9001/custom/bread/${id}`, inputs)
        .then(() => {
          navigate(`/custom/bread/${id}`);
        })
        .catch((res) => {
          setErr(res.data);
        });
    }
  };
  return (
    <main className="center-container">
      <h1>Update this bread:</h1>

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
    </main>
  );
};

export default UpdateBreadForm;
