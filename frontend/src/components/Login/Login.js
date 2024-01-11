import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import token from "../../context/token";
export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState();
  const auth = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.email.trim() === "" || inputs.password.trim() === "") {
      return setErr("Please provide all informations");
    }
    axios
      .post("http://localhost:9001/users/login", inputs, { headers: token() })
      .then((res) => {
        if (res.data.token) {
          auth.login(res.data);
          navigate("/");
        }
        setInputs({
          ...inputs,
          password: "",
          email: "",
        });
      })
      .catch((res) => {
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        setErr(res.data);
      });
  };

  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ y: window.innerWidth, transition: "1s" }}
    >
      <article className="center-container">
        <h1>Please login to your account:</h1>
        <section className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email"></label>
            <input
              value={inputs.email}
              name="email"
              type="email"
              placeholder="Email:"
              size="25"
              required
              onChange={handleChange}
            />
            <label htmlFor="Password"></label>
            <input
              value={inputs.password}
              name="password"
              type="password"
              placeholder="Password:"
              size="25"
              required
              onChange={handleChange}
            />
            <button className={"button-form"}>Validate</button>
          </form>
          {err && <span>{err}</span>}
        </section>
      </article>
    </motion.main>
  );
}
