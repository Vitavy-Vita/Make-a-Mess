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
          `http://localhost:9001/send/recovery-email/reset/${email}`,
          recovery.inputs,
          {
            headers: token(),
          }
        )
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
      transition={{
        type: "spring",
        stiffness: 300,
        mass: 7,
        damping: 50,
      }}
    >
      <section className="center-container">
        <h1>Reset your password:</h1>
        <article className="form-container">
          <form onSubmit={handlePwdChange}>
            <input
              value={recovery.inputs.password}
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
      </section>
    </motion.main>
  );
};

export default ResetPassword;
