const IngredientCard = ({ ingredient, onClick, onDelete }) => {
  return (
    <aside onClick={onClick} className="ingredient-card">
      <h3>{ingredient.name}</h3>
      <ul className="ingredient-list">
        <li>Protein:</li>
        <li>{ingredient.protein}</li>
        <li>Carbs:</li>
        <li>{ingredient.carbs}</li>
        <li onClick={onDelete} className="delete-icon">
          ❌
        </li>
        <li>Fat:</li>
        <li>{ingredient.fat}</li>
        <li>Calories:</li>
        <li>{ingredient.calories}</li>
      </ul>
    </aside>
  );
};

export default IngredientCard;
