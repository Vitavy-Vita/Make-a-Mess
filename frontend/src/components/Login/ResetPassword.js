import React, { useState } from "react";
import { useRecovery } from "../../context/recoveryContext";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import token from "../../context/token";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [err, setErr] = useState();
  const recovery = useRecovery();
  const auth = useAuth();
  const navigate = useNavigate();

  const handlePwdChange = (e) => {
    e.preventDefault();

    if (recovery.inputs.password === recovery.inputs.passwordConfirm) {
      axios
        .put(`http://localhost:9001/users/${auth.user.id}`, recovery.inputs, {
          headers: token(),
        })
        .then(() => {
          navigate(`/login`);
        })
        .catch((res) => {
          setErr(res.data);
        });
    }
    setErr("Make sure to match both passwords");
  };

  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ y: window.innerWidth }}
    >
      <section className="center-container">
        <h1>Reset your password:</h1>
        <article className="form-container">
          <form onSubmit={handlePwdChange}>
            <input
              value={recovery.inputs.password}
              name="password"
              type="text"
              placeholder="Password :"
              size="25"
              required
              onChange={recovery.handleChange}
            />
            <label htmlFor="Password"></label>
            <input
              value={recovery.inputs.passwordConfirm}
              name="passwordConfirm"
              type="text"
              placeholder="Password confirmation:"
              size="25"
              required
              onChange={recovery.handleChange}
            />
            {err && <span>{err}</span>}
            <button className={"button-form"}>Validate</button>
          </form>
        </article>
      </section>
    </motion.main>
  );
};

export default ResetPassword;
