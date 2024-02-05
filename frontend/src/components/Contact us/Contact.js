import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useReducer } from "react";
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

  const initialState = {
    send: null,
    inputs: {
      fullname: "",
      email: "",
      message: "",
    },
    err: "",
    response: "",
    disable: false,
    timerCount: 300,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      // case COUNTDOWN:
      case "ON_CHANGE":
        return {
          ...state,
          inputs: action.payload,
          err: "",
          response: "",
        };

      case "ON_SUBMIT":
        // if (
        //   // state.inputs.fullname.trim() === "" ||
        //   // state.inputs.email.trim() === "" ||
        //   // state.inputs.message.trim() === ""
        //   {...state.trim() === ""}
        // ) {
        //   return { err: "Please provide all informations" };
        // }
        console.log("====================================");
        console.log(state.inputs);
        console.log("====================================");
        const newMessage = axios
          .post(
            `http://localhost:9001/send`,

            {
              ...state.inputs,
            },
            {
              headers: token(),
            }
          )
          .then((res) => {
            return {
              send: res.data,
              response: res.data.message,
              // disable: !state.disable,
              inputs: {
                fullname: "",
                email: "",
                message: "",
              },
            };
          })
          .catch((error) => {
            return { err: error.response.data.message };
          });
        console.log("====================================");
        console.log(newMessage);
        console.log("====================================");
        return newMessage;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  // To stop the user from spamming messages, we set an interval of 5min on the "Send" button display once its pressed.
  // To do that we set an interval that will execute every 1sec in wich we declare a callback function that executes theses checks:
  // when the timer reaches below 1 the interval stops "counting" and clears itself, while also setting the disable state back to false (e.g: the button reappears).
  // we also make sure the counter cannont go below 0.
  // finaly if none of the above happens, it just counts down from the value stated in the timerCount until it reaches one condition.

  //   let interval = setInterval(() => {
  //     dispatch({
  //       type: COUNTDOWN,
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [state.disable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "ON_CHANGE", payload: { [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ON_SUBMIT" });
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
      className="main-contact-wrapper"
    >
      <section className="main-title">
        <h2>Let us know what you</h2>
        <h1>Think !!</h1>
      </section>
      <section
        className={
          !auth.user ? "contact-container-logout" : "contact-container"
        }
      >
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
            <input
              name="fullname"
              value={state.inputs.fullname}
              type="text"
              placeholder="Name:"
              size="25"
              onChange={handleChange}
              // required
            />

            <input
              name="email"
              value={state.inputs.email}
              type="email"
              placeholder="Email:"
              size="25"
              onChange={handleChange}
              // required
            />

            <textarea
              name="message"
              value={state.inputs.message}
              id=""
              cols="25"
              rows="10"
              placeholder="Your Message:"
              onChange={handleChange}
              // required
            ></textarea>
            {/* {err && <span>{err}</span>}
            {response && <span>{response}</span>}
            // {!disable && <button>Send</button>} */}
            <button>Send</button>
          </form>
        )}
      </section>
      <section
        className={!auth.user ? "business-wrapper-logout" : "business-wrapper"}
      >
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
