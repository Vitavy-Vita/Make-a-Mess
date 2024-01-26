import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRecovery } from "../../context/recoveryContext";
import axios from "axios";
import token from "../../context/token";
import { useNavigate } from "react-router-dom";

const OTPInput = () => {
  const recovery = useRecovery();
  const [err, setErr] = useState();
  const [timerCount, setTimerCount] = useState(60);
  const [disable, setDisable] = useState(false);
  const [otpInputs, setOtpInputs] = useState([0, 0, 0, 0]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setInterval(() => {
      setTimerCount((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  const verifyOtp = (e) => {
    e.preventDefault();
    if (parseInt(otpInputs.join("")) === recovery.otp) {
      navigate("/send/recovery-email/reset");
    } else {
      setErr("You've entered an incorrect code, try again or re-send a code");
    }
  };

  const resendOtp = () => {
    if (disable) return;
    axios
      .post(
        "http://localhost:9001/send/recovery-email/otp",
        {
          OTP: recovery.OTP,
          userEmail: recovery.inputs.email,
        },
        { headers: token() }
      )
      .then(
        () => setDisable(true),
        setTimerCount(60),
        setErr("We sent a new verification code to your email address")
      )
      .catch((err) => {
        setErr(err);
      });
    {
    }
  };

  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ y: window.innerWidth }}
    >
      <h2>Email verification</h2>
      <section className="recovery-form-container">
        <form>
          <p>We sent a One-Time-Password to : {recovery.inputs.email}</p>
          <article>
            <input
              className="recovery-input"
              name="num1"
              type="text"
              maxLength={1}
              required
              onChange={(e) =>
                setOtpInputs([
                  e.target.value,
                  otpInputs[1],
                  otpInputs[2],
                  otpInputs[3],
                ])
              }
            />
            <input
              className="recovery-input"
              name="num2"
              type="text"
              maxLength={1}
              required
              onChange={(e) =>
                setOtpInputs([
                  otpInputs[0],
                  e.target.value,
                  otpInputs[2],
                  otpInputs[3],
                ])
              }
            />
            <input
              className="recovery-input"
              name="num2"
              type="text"
              maxLength={1}
              required
              onChange={(e) =>
                setOtpInputs([
                  otpInputs[0],
                  otpInputs[1],
                  e.target.value,
                  otpInputs[3],
                ])
              }
            />
            <input
              className="recovery-input"
              name="num2"
              type="text"
              maxLength={1}
              required
              onChange={(e) =>
                setOtpInputs([
                  otpInputs[0],
                  otpInputs[1],
                  otpInputs[2],
                  e.target.value,
                ])
              }
            />
          </article>
          <article>
            <small>Didn't receive code ?</small>
            {disable ? (
              <small>Resend code in {timerCount}</small>
            ) : (
              <small
                style={{
                  color: "#825b56",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={resendOtp}
              >
                Resend code
              </small>
            )}
          </article>
          {err && <span>{err}</span>}
          <button className={"button-form"} onClick={verifyOtp}>
            Verify account
          </button>
        </form>
      </section>
    </motion.main>
  );
};

export default OTPInput;
