import React from "react";
import { useRecovery } from "../../context/recoveryContext";
import { motion } from "framer-motion";

const ResetPassword = () => {

  const recovery = useRecovery();
  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ y: window.innerWidth }}
    >
      <section className="center-container">
        <h1>Reset your password:</h1>
        <article className="form-container">
          <form>
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
            <button className={"button-form"}>Validate</button>
          </form>
        </article>
      </section>
    </motion.main>
  );
};

export default ResetPassword;
