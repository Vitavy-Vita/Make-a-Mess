import BurgerCard from "./BurgerCard";
import data from "./data";

export default function BurgerGallery() {
  return (
    <article className="container">
      <section className="burger-gallery-container">
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
      </section>
    </article>
  );
}
