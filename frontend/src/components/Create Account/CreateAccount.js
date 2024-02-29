import { motion } from "framer-motion";
import axios from "axios";
import React, { useState } from "react";

export default function CreateAccount() {
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    passwordConfirm: "",
    tel: "",
    email: "",
  });
  const [err, setErr] = useState();
  const [response, setResponse] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setInputs({ ...inputs, image: e.target.files[0] });
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
      inputs.tel.trim() === "" ||
      inputs.email.trim() === ""
    ) {
      return setErr("Please provide all informations");
    }
    const formData = new FormData();

    formData.append("name", inputs.name);
    formData.append("password", inputs.password);
    formData.append("passwordConfirm", inputs.passwordConfirm);
    formData.append("tel", inputs.tel);
    formData.append("email", inputs.email);
    formData.append("image", inputs.image);
    axios
      // .post("http://yohannrousseau.3wa.io:9001",inputs)
      .post("http://localhost:9001/users/register", formData)
      .then((res) => {
        setInputs({
          ...inputs,
          name: "",
          password: "",
          passwordConfirm: "",
          tel: "",
          email: "",
          image: null,
        });
        setResponse("Your account has been successfully created !");
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
      <section className="form-container">
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

          <input
            type="tel"
            placeholder="Phone number:"
            size="25"
            value={inputs.tel}
            name="tel"
            onChange={handleChange}
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
          <button className={"button-form"}>Validate</button>
        </form>
      </section>
    </motion.main>
  );
}
