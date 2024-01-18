import React, { useState } from "react";

const UpdateUserForm = () => {
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    passwordConfirm: "",
    tel: "",
    email: "",
  });
  const [err, setErr] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr("");
  };
  return (
    <main className="center-container">
      <h1>Update your account:</h1>
      <section className="form-container">
        <form>
          <input
            value={inputs.name}
            type="text"
            placeholder="Name:"
            size="25"
            name="name"
            max={"10"}
            onChange={handleChange}
          />

          <input
            value={inputs.password}
            type="password"
            placeholder="Password:"
            size="25"
            name="password"
            onChange={handleChange}
          />

          <input
            value={inputs.passwordConfirm}
            type="password"
            placeholder="Confirm Password:"
            size="25"
            name="passwordConfirm"
            onChange={handleChange}
          />

          <input
            value={inputs.tel}
            type="tel"
            placeholder="Phone number:"
            size="25"
            name="tel"
            onChange={handleChange}
          />

          <input
            value={inputs.email}
            type="email"
            placeholder="Email:"
            size="25"
            name="email"
            onChange={handleChange}
          />
          <button className={"button-form"}>Validate</button>
        </form>
      </section>
    </main>
  );
};

export default UpdateUserForm;
