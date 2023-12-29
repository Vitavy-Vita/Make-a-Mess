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
      <div className="burger-description">
        <p>{props.description}</p>
        <div>
          <p>Protein: </p>
          <p>Carbs: </p>
          <p>Fat: </p>
          <p>Calories: </p>
        </div>
        <div>
          <p>{props.protein}</p>
          <p>{props.carbs}</p>
          <p>{props.fat}</p>
          <p>{props.calories}</p>
        </div>
      </div>
    </div>
  );
}
