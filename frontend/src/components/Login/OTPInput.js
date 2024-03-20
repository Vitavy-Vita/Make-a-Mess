import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRecovery } from "../../context/recoveryContext";
import axios from "axios";
import token from "../../context/token";
import { useNavigate } from "react-router-dom";

const OTPInput = () => {
  const recovery = useRecovery();
  const [err, setErr] = useState();
  const [response, setResponse] = useState();
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
    if (!recovery.inputs.email) return;
    if (disable) return;
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    recovery.setOtp(OTP);
    axios

      .post(
        `${process.env.REACT_APP_BASE_URL}/send/recovery-email/otp`,
        {
          OTP,
          userEmail: recovery.inputs.email,
        },
        { headers: token() }
      )
      .then(
        () => setDisable(true),
        setTimerCount(60),
        setResponse("We sent a new verification code to your email address")
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
    // if there is already a value in the newOtp, change focus to the next one
    if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
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
      <h2>Email verification</h2>

      <section className="form-container">
        <form>
          <p>We sent a One-Time-Password to : {recovery.inputs.email}</p>
          <article>
            {otpInputs.map((digit, index) => (
              <input
                className="recovery-input"
                key={index}
                type="text"
                size="1"
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
            <p>Didn't receive code ?</p>
            {disable ? (
              <small>Resend code in {timerCount}</small>
            ) : (
              <motion.small
                style={{
                  color: "#825b56",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={resendOtp}
                whileHover={{
                  color: "#faf6f6",
                  scale: 1.2,
                }}
              >
                Resend code
              </motion.small>
            )}
          </article>
          {response && <span>{response}</span>}
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
