import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";


const SauceCard = () => {
    const [sauce, setSauce] = useState();
    const [err, setErr] = useState();
    const { id } = useParams();
    useEffect(() => {
      axios
        .get(`http://localhost:9001/custom/sauce/${id}`)
        .then((res) => {
            setSauce(res.data);
        })
        .catch((res) => {
          setErr(res.data);
        });
    }, []);
    return (
        <main className="user-card-container">
        {sauce && (
          <article className="user-card">
            <h2>{sauce.name}</h2>
            <p>Protein: {sauce.protein}</p>
            <p>Carbs: {sauce.carbs}</p>
            <p>Fat: {sauce.fat}</p>
            <p>Calories: {sauce.calories}</p>
            <NavLink to={"/Settings/Admin"}>
              <button>Go Back</button>
            </NavLink>
          </article>
        )}
      </main>
    );
};

export default SauceCard;