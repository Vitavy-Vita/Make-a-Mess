import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import token from "../../context/token";

const DashboardUser = () => {
  const [user, setUser] = useState([]);
  const [err, setErr] = useState();
  const auth = useAuth();
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    tel: "",
    email: "",
  });


  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/users/${auth.user.id}`)
      .then((res) => {
        setUser(res.data);
        setInputs(res.data);
      })
      .catch((res) => {
        setErr(res.response.message);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setInputs({ ...inputs, image: files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
    setErr("");
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmBox = window.confirm(
      "Are you sure you wish to make these changes ?"
    );

    if (confirmBox === true) {
      const formData = new FormData();

      formData.append("name", inputs.name);
      formData.append("password", inputs.password);
      formData.append("tel", inputs.tel);
      formData.append("email", inputs.email);
      formData.append("image", inputs.image);
      axios
        .put(`http://localhost:9001/users/${auth.user.id}`, formData, {
          headers: token(),
        })
        .then(() => {
          navigate(`/my-profil`);
        })
        .catch((res) => {
          setErr(res.data);
        });
    }
  };
  return (
    <main className="center-container">
      <h1>{user.name}</h1>
      <h2>Update your account:</h2>
      <section className="form-container">
        <form encType="multipart/form-data">
          <input
            value={inputs.name}
            type="text"
            placeholder={`${user ? user.name : "not working"}`}
            size="25"
            name="name"
            max={"10"}
            onChange={handleChange}
          />

          <input
            value={inputs.password}
            type="password"
            placeholder={`*********`}
            size="25"
            name="password"
            onChange={handleChange}
          />

          <input
            value={inputs.tel}
            type="tel"
            placeholder={`${user ? user.tel : "not working"}`}
            size="25"
            name="tel"
            onChange={handleChange}
          />

          <input
            value={inputs.email}
            type="email"
            placeholder={`${user ? user.email : "not working"}`}
            size="25"
            name="email"
            onChange={handleChange}
          />
          <input type="file" name="image" id="image" onChange={handleChange} />
          {err && <span>{err}</span>}
          <article className="button-update-user">
            <button onClick={handleSubmit}>Update</button>

            <button>Delete</button>
          </article>
          <NavLink to={"/"}>
            <button>Go back</button>
          </NavLink>
        </form>
      </section>
    </main>
  );
};

export default DashboardUser;
