import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import token from "../../context/token";
import { useAuth } from "../../context/authContext";

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
    >
      <section className="main-title">
        <h2>Let us know what you</h2>
        <h1 className="think">Think !!</h1>
      </section>
      <section className="contact-container">
        <article>
          <h2>Get in touch with our team </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatem, veritatis necessitatibus! Laborum dicta maiores odit
            porro voluptatem deserunt, sapiente voluptatibus illo eveniet sunt
            ratione ut aperiam hic, sequi deleniti dolorem officia ullam quam
            quia qui. Nulla, ipsa placeat tenetur error officiis magnam minus
            vitae reprehenderit. Porro eligendi quos earum iure?
          </p>
          <h2>Business info</h2>
          <address>
            <span>
              1701, South Catalina Avenue, Redondo Beach, Los Angeles County,
              Californie, 90277, États-Unis d'Amérique
            </span>
            <span>MakeaMess.burgers@gmail.com</span>
            <span>06 03 27 01 57</span>
          </address>
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
      <h2 className="sub-title-contact">Where to find us</h2>
      <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-118.38889181613924%2C33.818012851179546%2C-118.38786989450458%2C33.81998719507269&amp;layer=mapnik&amp;marker=33.819000028823254%2C-118.38838085532188"></iframe>
      <br />
      <small>
        <a href="https://www.openstreetmap.org/?mlat=33.81900&amp;mlon=-118.38838#map=19/33.81900/-118.38838">
          Show a bigger map
        </a>
      </small>
    </motion.main>
  );
}
