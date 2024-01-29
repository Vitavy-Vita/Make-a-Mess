import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRecovery } from "../../context/recoveryContext";
import axios from "axios";
import token from "../../context/token";
import { useNavigate, useParams } from "react-router-dom";

const OTPInput = () => {
  const recovery = useRecovery();
  const [err, setErr] = useState();
  const [timerCount, setTimerCount] = useState(60);
  const [disable, setDisable] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const inputs = [];
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
      navigate(`/send/recovery-email/reset/${recovery.inputs.email}`);
    } else {
      setErr("You've entered an incorrect code, try again or re-send a code");
      setOtpInputs(["", "", "", ""]);
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
  const handleOtpChange = (value, index) => {
    const newOtp = [...otpInputs];
    newOtp[index] = value;
    setOtpInputs(newOtp);
    if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
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
            {otpInputs.map((digit, index) => (
              <input
                className="recovery-input"
                key={index}
                type="text"
                maxLength={1}
                required
                onChange={(e) => handleOtpChange(e.target.value, index)}
                value={digit}
                ref={(input) => {
                  inputs[index] = input;
                }}
              />
            ))}
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
