import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";


const MeatCard = () => {
    const [meat, setMeat] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/custom/meat/${id}`)
      .then((res) => {
        setMeat(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);
    return (
        <main className="user-card-container">
      {meat && (
        <article className="user-card">
          <h2>{meat.name}</h2>
          <p>Protein: {meat.protein}</p>
          <p>Carbs: {meat.carbs}</p>
          <p>Fat: {meat.fat}</p>
          <p>Calories: {meat.calories}</p>
          <NavLink to={"/update/meat"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </main>
    );
};

export default MeatCard;