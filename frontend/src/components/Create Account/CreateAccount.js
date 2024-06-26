import { motion } from "framer-motion";
import axios from "axios";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [tel, setTel] = useState();
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });
  const [err, setErr] = useState();
  const [response, setResponse] = useState();
  const [capValue, setCapValue] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setInputs({ ...inputs, image: e.target.files[0] });
    } else if (name === "tel") {
      setTel({ tel, [name]: value });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
    setErr("");
    setResponse("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.passwordConfirm) {
      return setErr("Passwords do not match");
    }
    if (inputs.password.length < 8) {
      return setErr("Password must be at least 8 characters");
    }
    if (
      inputs.name.trim() === "" ||
      inputs.password.trim() === "" ||
      inputs.passwordConfirm.trim() === "" ||
      tel.trim() === "" ||
      inputs.email.trim() === ""
    ) {
      return setErr("Please provide all informations");
    }
    const formData = new FormData();

    formData.append("name", inputs.name);
    formData.append("password", inputs.password);
    formData.append("passwordConfirm", inputs.passwordConfirm);
    formData.append("tel", tel);
    formData.append("email", inputs.email);
    formData.append("image", inputs.image);
    console.log(tel);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/register`, formData)
      .then((res) => {
        setInputs({
          ...inputs,
          name: "",
          password: "",
          passwordConfirm: "",
          email: "",
          image: null,
        });
        setTel("");
        setResponse("Your account has been successfully created !");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((res) => {
        setErr(res.response.data.message);
      });
  };
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
      }}
      className="center-container"
    >
      <h2>Create your account</h2>
      <section className="form-container create-form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Name:"
            size="25"
            value={inputs.name}
            name="name"
            max={"10"}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password:"
            size="25"
            value={inputs.password}
            name="password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password:"
            size="25"
            value={inputs.passwordConfirm}
            name="passwordConfirm"
            onChange={handleChange}
            required
          />
          <PhoneInput
            size="25"
            placeholder="Phone number:"
            value={tel}
            name="tel"
            onChange={setTel}
            required
          />
          <input
            type="email"
            placeholder="Email:"
            size="25"
            value={inputs.email}
            name="email"
            onChange={handleChange}
            required
          />
          <label htmlFor="image">Add a profil picture</label>
          <input type="file" name="image" id="image" onChange={handleChange} />
          {err && <span>{err}</span>}
          {response && <span>{response}</span>}
          <p>Check the box to create your account</p>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_CAPTCHA_SERVER_KEY}
            onChange={(value) => setCapValue(value)}
            style={{
              margin: "0.5em",
              border: "2px solid #c85a44",
              borderRadius: "5px",
            }}
          />
          <button
            className={`button-form ${capValue ? "" : "disable"}`}
            disabled={!capValue}
          >
            Validate
          </button>
        </form>
      </section>
    </motion.main>
  );
}
