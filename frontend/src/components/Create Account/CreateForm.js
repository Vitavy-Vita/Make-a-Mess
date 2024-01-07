import axios from "axios";
import React, { useState } from "react";
export default function CreateForm() {
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
    setInputs({ ...inputs, [name]: value });
    setErr("");
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
    axios
      .post("http://yohannrousseau.3wa.io:9001",inputs)
      // .post("http://localhost:9001/user/new", inputs)
      .then((res) => {
        setInputs({
          ...inputs,
          name: "",
          password: "",
          passwordConfirm: "",
          tel: "",
          email: "",
        });
        setResponse("Your account has been successfully created !");
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  };
  return (
    <article className="center-container">
      <h1>Create your account:</h1>
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name:"
            size="25"
            value={inputs.name}
            name="name"
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
          <button className={"button-form"}>Validate</button>
          {err && <span>{err}</span>}
          {response && <span>{response}</span>}
        </form>
      </section>
    </article>
  );
}
