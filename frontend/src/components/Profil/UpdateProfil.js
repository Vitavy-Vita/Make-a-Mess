import { motion } from "framer-motion";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import token from "../../context/token";

const UpdateProfil = () => {
  const [inputs, setInputs] = useState({
    name: "",
    tel: "",
    email: "",
    image: "",
  });

  const [err, setErr] = useState();
  const [response, setResponse] = useState();

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9001/users/${auth.user.id}`)
      .then((res) => {
        setInputs(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setInputs({ ...inputs, image: e.target.files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
    setErr("");
    setResponse("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmBox = window.confirm(
      "Are you sure you wish to make these changes ?"
    );

    if (confirmBox === true) {
      const formData = new FormData();

      formData.append("name", inputs.name);
      formData.append("tel", inputs.tel);
      formData.append("email", inputs.email);
      formData.append("image", inputs.image);

      axios
        .put(`http://localhost:9001/users/${auth.user.id}`, formData, {
          headers: token(),
        })
        .then(() => {
          navigate("/my-profil");
        })
        .catch((res) => {
          setErr(res.response.data.message);
        });
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
      <h2>Update your account</h2>
      <section className="form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Name:"
            size="25"
            value={inputs.name}
            name="name"
            max={"10"}
            onChange={handleChange}
          />
          <input
            type="tel"
            placeholder="Phone number:"
            size="25"
            value={inputs.tel}
            onChange={handleChange}
            name="tel"
          />

          <input
            type="email"
            placeholder="Email:"
            size="25"
            value={inputs.email}
            name="email"
            onChange={handleChange}
          />

          <input type="file" name="image" id="image" onChange={handleChange} />
          <NavLink to={`/send/recovery-email/reset/${inputs.email}`}>
            Reset password
          </NavLink>
          {err && <span>{err}</span>}
          {response && <span>{response}</span>}

          <button>Validate</button>
        </form>
        <NavLink to={"/my-profil"}>
          <button>Go Back</button>
        </NavLink>
      </section>
    </motion.main>
  );
};

export default UpdateProfil;
