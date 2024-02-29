import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import token from "../../context/token";
import { useAuth } from "../../context/authContext";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  const auth = useAuth();
  const [send, setSend] = useState();
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [err, setErr] = useState();
  const [response, setResponse] = useState();

  const [disable, setDisable] = useState(false);
  const [timerCount, setTimerCount] = useState(300);

  // To stop the user from spamming messages, we set an interval of 5min on the "Send" button display once its pressed.
  // To do that we use setInterval every 1sec with a callback function that executes theses checks:
  // when the timer reaches below 1 the interval stops "counting" and clears itself, while also setting the disable state back to false (e.g: the button reappears).
  // we also make sure the counter cant go below 0.
  // finaly if none of the above happens, it just counts down from the value stated in the timerCount until it reaches one condition.

  const disableButton = () => {
    let interval = setInterval(() => {
      setTimerCount((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr("");
    setResponse("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.fullname.trim() === "" ||
      inputs.email.trim() === "" ||
      inputs.message.trim() === ""
    ) {
      return setErr("Please provide all informations");
    }
    axios
      .post(`http://localhost:9001/send`, inputs, { headers: token() })
      .then((res) => {
        setSend(res.data);
        setResponse(res.data.message);
        setDisable(!disable);
        setInputs({
          fullname: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setErr(error.response.data.message);
      });
  };
  return (
    // we have here multiples checks to change the display of the page depending if the user is logged in or not.
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        type: "spring",
        stiffness: 300,
        mass: 7,
        damping: 50,
      }}
      className="main-contact-container"
    >
      <section className="main-title">
        <h2>Let us know what you</h2>
        <h1 className="think">Think !!</h1>
      </section>
      <section className="main-contact-wrapper">
        <article>
          <h2>Get in touch with us</h2>
          <p>
            Our team will always be available to hear anything you have to say !
          </p>
          <p>
            We have at your disposal
            {!auth.user && <em>(users only, make sure to be logged in)</em>} a
            form you can use to send us a direct email, we will respond to you
            in no time !
          </p>
        </article>
        {auth.user && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="Name" />
            <input
              name="fullname"
              value={inputs.fullname}
              type="text"
              placeholder="Name:"
              size="25"
              onChange={handleChange}
              required
            />
            <label htmlFor="Mail" />
            <input
              name="email"
              value={inputs.email}
              type="email"
              placeholder="Email:"
              size="25"
              onChange={handleChange}
              required
            />
            <label htmlFor="comment" />
            <textarea
              name="message"
              value={inputs.message}
              id=""
              cols="25"
              rows="10"
              placeholder="Your Message:"
              onChange={handleChange}
            ></textarea>
            {err && <span>{err}</span>}
            {response && <span>{response}</span>}
            {!disable && <button onClick={disableButton}>Send</button>}
          </form>
        )}
        <article className="business-wrapper">
          <h2>Business info</h2>
          <a href="https://www.openstreetmap.org/?mlat=33.81900&amp;mlon=-118.38838#map=19/33.81900/-118.38838">
            <CiLocationOn />
            1701, South Catalina Avenue, Redondo Beach, Los Angeles County,
            Californie, 90277, États-Unis d'Amérique
          </a>
          <a href="mailto:MakeaMess.burgers@gmail.com">
            <CiMail />
            MakeaMess.burgers@gmail.com
          </a>
          <a href="tel:+33603270157">
            <CiPhone />
            06 03 27 01 57
          </a>
        </article>
        <article className="icon-wrapper">
          <motion.a
            href="https://www.facebook.com/?locale=fr_FR"
            target="_blank"
            className="facebook-icon"
            whileHover={{
              rotate: 360,
              scale: 1.5,
            }}
          >
            <FaFacebook />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/"
            target="_blank"
            className="insta-icon"
            whileHover={{
              rotate: 360,
              scale: 1.5,
            }}
          >
            <FaInstagramSquare />
          </motion.a>
          <motion.a
            href="https://twitter.com/home?lang=fr"
            target="_blank"
            className="twitter-icon"
            whileHover={{
              rotate: 360,
              scale: 1.2,
            }}
          >
            <FaXTwitter />
          </motion.a>
        </article>
        <article className="where-to-wrapper">
          <h2 className="sub-title-contact">Where to find us</h2>
          <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-118.38889181613924%2C33.818012851179546%2C-118.38786989450458%2C33.81998719507269&amp;layer=mapnik&amp;marker=33.819000028823254%2C-118.38838085532188"></iframe>
        </article>
      </section>
    </motion.main>
  );
}
