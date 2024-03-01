import React, { useState } from "react";
import { useRecovery } from "../../context/recoveryContext";
import { motion } from "framer-motion";
import axios from "axios";
import token from "../../context/token";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [err, setErr] = useState();
  const recovery = useRecovery();
  const navigate = useNavigate();
  const { email } = useParams();

  const handlePwdChange = (e) => {
    e.preventDefault();

    if (recovery.inputs.password === recovery.inputs.passwordConfirm) {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/send/recovery-email/reset/${email}`,
          recovery.inputs,
          {
            headers: token(),
          }
        )
        .then(() => {
          navigate(`/login`);
        })
        .catch((res) => {
          setErr("Password format not correct");
        });
    }
    setErr("Make sure to match both passwords");
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
      <h2>Reset your password</h2>
      <article className="form-container">
        <form onSubmit={handlePwdChange}>
          <input
            name="password"
            type="password"
            placeholder="Password :"
            size="25"
            required
            onChange={recovery.handleChange}
          />
          <input
            name="passwordConfirm"
            type="password"
            placeholder="Password confirmation:"
            size="25"
            required
            onChange={recovery.handleChange}
          />
          {err && <span>{err}</span>}
          <button className={"button-form"}>Validate</button>
        </form>
      </article>
    </motion.main>
  );
};

export default ResetPassword;
