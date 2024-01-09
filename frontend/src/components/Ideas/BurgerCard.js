import { useState, useParams, useEffect } from "react";

import axios from "axios";

export default function BurgerCard() {
  const [burger, setBurger] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:9001/burgers/${id}`)
      .then((res) => {
        setBurger(res.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);
  return (
    <article className="burger-card">
      {burger && (
        <img
          src={`http://localhost:9001/assets/img/${burger.image.src}`}
          alt={burger.image.alt}
          style={{
            width: "250px",
            height: "150px",
            border: "4px solid white",
            borderRadius: "15px",
            margin: "0 2em",
          }}
        />
      )}
      <table className="burger-description">
        <thead>
          <tr>
            <th>{burger.name}</th>
          </tr>
          <tbody>
            <tr>
              <td>{burger.description}</td>
            </tr>
            <tr>
              <td>Protein:</td>
              <td>{burger.protein}</td>
            </tr>
            <tr>
              <td>Carbs:</td>
              <td>{burger.carbs}</td>
            </tr>
            <tr>
              <td>Fat:</td>
              <td>{burger.fat}</td>
            </tr>
            <tr>
              <td>Calories:</td>
              <td>{burger.calories}</td>
            </tr>
          </tbody>
        </thead>
      </table>
    </article>
  );
}
