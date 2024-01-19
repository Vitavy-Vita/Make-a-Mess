import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const PreMadeCard = () => {
  const [preMade, setPremade] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/burgers/${id}`)
      .then((res) => {
        setPremade(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);
  return (
    <main className="user-card-container">
      {preMade && (
        <article className="user-card">
          <img
            src={`http://localhost:9001/assets/img/${preMade.image.src}`}
            alt={preMade.image.alt}
            className="premade-card-img"
          />
          <h2>{preMade.name}</h2>
          <p>Description: {preMade.description}</p>
          <p>Protein: {preMade.protein}</p>
          <p>Carbs: {preMade.carbs}</p>
          <p>Fat: {preMade.fat}</p>
          <p>Calories: {preMade.calories}</p>
          <NavLink to={"/Settings/Admin"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </main>
  );
};

export default PreMadeCard;
