import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const ToppingCard = () => {
    const [topping, setTopping] = useState();
    const [err, setErr] = useState();
    const { id } = useParams();
    useEffect(() => {
      axios
        .get(`http://localhost:9001/custom/topping/${id}`)
        .then((res) => {
            setTopping(res.data);
        })
        .catch((res) => {
          setErr(res.data);
        });
    }, []);
    return (
        <main className="user-card-container">
        {topping && (
          <article className="user-card">
            <h2>{topping.name}</h2>
            <p>Protein: {topping.protein}</p>
            <p>Carbs: {topping.carbs}</p>
            <p>Fat: {topping.fat}</p>
            <p>Calories: {topping.calories}</p>
            <NavLink to={"/Settings/Admin"}>
              <button>Go Back</button>
            </NavLink>
          </article>
        )}
      </main>
    );
};

export default ToppingCard;