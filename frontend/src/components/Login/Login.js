import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useRecovery } from "../../context/recoveryContext";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import token from "../../context/token";

export default function Login() {
  const [err, setErr] = useState();

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
        setErr(res.data);
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
        .catch(() => setErr("This email doesn't exists"));
    } else {
      setErr("Please provide your email first.");
    }
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
        <h2>Please login to your account:</h2>
        <article className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email"></label>
            <input
              value={recovery.inputs.email}
              name="email"
              type="email"
              placeholder="Email:"
              size="25"
              required
              onChange={recovery.handleChange}
            />
            <label htmlFor="Password"></label>
            <input
              value={recovery.inputs.password}
              name="password"
              type="password"
              placeholder="Password:"
              size="25"
              required
              onChange={recovery.handleChange}
            />
            <span
              onClick={handleEmailRecovery}
              style={{
                color: "#825b56",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Forgot password ?
            </span>
            {!recovery.inputs.email && <span>{err}</span>}
            <button className={"button-form"}>Validate</button>
          </form>
        </article>
      </section>
    </motion.main>
  );
}
