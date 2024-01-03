import React from "react";

export default function BurgerCard(props) {
  return (
    <div className="burger-card">
      <div
        style={{
          backgroundImage: `url(${props.image})`,
          width: "300px",
          height: "200px",
          border: "4px solid white",
          borderRadius: "5%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>

      <h2>{props.name}</h2>
      <section className="burger-description">
        <p>{props.description}</p>
        <ul>
          <li>Protein: </li>
          <li>Carbs: </li>
          <li>Fat: </li>
          <li>Calories: </li>
        </ul>
        <ul>
          <li>{props.protein}</li>
          <li>{props.carbs}</li>
          <li>{props.fat}</li>
          <li>{props.calories}</li>
        </ul>
      </section>
    </div>
  );
}
