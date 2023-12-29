import BurgerCard from "./BurgerCard";
import data from "./data";

export default function BurgerGallery() {
  return (
    <div className="container">
      <div className="main-title">
        <h2>Here is a few pre-made</h2>
        <h1>Burger !!</h1>
      </div>
      <div className="burger-gallery-container">
        {data.map((item) => (
          <BurgerCard
            name={item.name}
            image={item.image}
            description={item.description}
            protein={item.protein}
            carbs={item.carbs}
            fat={item.fat}
            calories={item.calories}
          />
        ))}
      </div>
    </div>
  );
}
