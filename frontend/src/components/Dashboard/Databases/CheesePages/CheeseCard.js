import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const CheeseCard = () => {
  const [cheese, setCheese] = useState();
  const [err, setErr] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9001/custom/cheese/${id}`)
      .then((res) => {
        setCheese(res.data);
      })
      .catch((res) => {
        setErr(res.data);
      });
  }, []);
  return (
    <main className="user-card-container">
      {cheese && (
        <article className="user-card">
          <h2>{cheese.name}</h2>
          <p>Protein: {cheese.protein}</p>
          <p>Carbs: {cheese.carbs}</p>
          <p>Fat: {cheese.fat}</p>
          <p>Calories: {cheese.calories}</p>
          <NavLink to={"/Settings/Admin"}>
            <button>Go Back</button>
          </NavLink>
        </article>
      )}
    </main>
  );
};

export default CheeseCard;
