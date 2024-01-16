import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const BreadCard = () => {
  const [bread, setBread] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/custom/bread/${id}`)
      .then((res) => {
        setBread(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);
  return (
    <main className="user-card-container">
      {bread && (
        <article className="user-card">
          <h2>{bread.name}</h2>
          <p>Protein: {bread.protein}</p>
          <p>Carbs: {bread.carbs}</p>
          <p>Fat: {bread.fat}</p>
          <p>Calories: {bread.calories}</p>
          <NavLink to={"/Settings/Admin"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </main>
  );
};

export default BreadCard;
