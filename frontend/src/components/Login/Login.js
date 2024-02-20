import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useRecovery } from "../../context/recoveryContext";
import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import token from "../../context/token";

export default function Login() {
  const [err, setErr] = useState();
  const [errEmail, setErrEmail] = useState();
  const auth = useAuth();
  const recovery = useRecovery();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      recovery.inputs.email.trim() === "" ||
      recovery.inputs.password.trim() === ""
    ) {
      return setErr("Please provide all informations");
    }
    axios
      .post("http://localhost:9001/users/login", recovery.inputs, {
        headers: token(),
      })
      .then((res) => {
        if (res.data.token) {
          auth.login(res.data);
          navigate("/");
        }
        recovery.setInputs({
          ...recovery.inputs,
          password: "",
          email: "",
        });
      })
      .catch((res) => {
        setErr(res.response.data.message);
      });
  };

  const handleEmailRecovery = () => {
    const verifyEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~\s-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (recovery.inputs.email && verifyEmail.test(recovery.inputs.email)) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      recovery.setOtp(OTP);
      axios
        .post(
          "http://localhost:9001/send/recovery-email/otp",
          {
            OTP,
            userEmail: recovery.inputs.email,
          },
          { headers: token() }
        )
        .then(() => navigate("/send/recovery-email/otp"))
        .catch(() => setErrEmail("This email doesn't exists"));
    } else {
      setErrEmail("Please provide your email first.");
    }
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
      <h2>Please login to your account</h2>
      <article className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            value={recovery.inputs.email}
            name="email"
            type="email"
            placeholder="Email:"
            size="25"
            required
            onChange={recovery.handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password:"
            size="25"
            required
            onChange={recovery.handleChange}
          />
          <aside>
            <NavLink to={"/create-account"}>New account</NavLink>
            <small onClick={handleEmailRecovery}>Forgot password ?</small>
          </aside>
          {!recovery.inputs.email && <span>{errEmail}</span>}
          {err && <span>{err}</span>}
          <button className={"button-form"}>Validate</button>
        </form>
      </article>
    </motion.main>
  );
}
