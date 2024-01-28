import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
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
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ y: window.innerWidth, transition: "1s" }}
      className="main-contact-wrapper"
    >
      <section className="main-title">
        <h2>Let us know what you</h2>
        <h1>Think !!</h1>
      </section>
      <section className="contact-container">
        <article>
          <h2>Get in touch with our team </h2>
          <p>
            Our team will always be available to hear anything you have to say !
          </p>
          <p>
            We have at your disposal (users only, make sure to be logged in) a
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
            <button>Send</button>
            {err && <span>{err}</span>}
            {response && <span>{response}</span>}
          </form>
        )}
      </section>
      <section className="business-wrapper">
        <article className="business">
          <h2>Business info</h2>
          <ul>
            <li>
              <motion.a
                href="https://www.openstreetmap.org/?mlat=33.81900&amp;mlon=-118.38838#map=19/33.81900/-118.38838"
                whileHover={{
                  color: "#c85a44",
                  textDecoration: "underline",
                }}
              >
                <CiLocationOn />
                1701, South Catalina Avenue, Redondo Beach, Los Angeles County,
                Californie, 90277, États-Unis d'Amérique
              </motion.a>
            </li>
            <li>
              <motion.a
                href="mailto:MakeaMess.burgers@gmail.com"
                whileHover={{
                  color: "#c85a44",
                  textDecoration: "underline",
                }}
              >
                <CiMail />
                MakeaMess.burgers@gmail.com
              </motion.a>
            </li>
            <li>
              <motion.a
                href="tel:+33603270157"
                whileHover={{
                  color: "#c85a44",
                  textDecoration: "underline",
                }}
              >
                <CiPhone />
                06 03 27 01 57
              </motion.a>
            </li>
          </ul>
        </article>
        <article className="icon-container-contact">
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
      </section>
      <section className="where-to-wrapper">
        <h2 className="sub-title-contact">Where to find us</h2>
        <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-118.38889181613924%2C33.818012851179546%2C-118.38786989450458%2C33.81998719507269&amp;layer=mapnik&amp;marker=33.819000028823254%2C-118.38838085532188"></iframe>
      </section>
    </motion.main>
  );
}
