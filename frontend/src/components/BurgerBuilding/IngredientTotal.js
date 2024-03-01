const IngredientTotal = ({onChange, totalMacros, onSubmit, err}) => {
  return (
    <section className="ingredient-total">
      <h2>Here is your macros!</h2>
      <ul className="ingredient-list">
        <li>Protein:</li>
        <li>{totalMacros.protein}</li>
        <li>Carbs:</li>
        <li>{totalMacros.carbs}</li>
        <li>Fat:</li>
        <li>{totalMacros.fat}</li>
        <li>Calories:</li>
        <li>{totalMacros.calories}</li>
      </ul>
      <article className={``}>
        <h2>Give it a name !</h2>
        <input
          type="text"
          name="name"
          className="inputs"
          onChange={onChange}
        />
        {err && <span>{err}</span>}
      </article>
      <button onClick={onSubmit}>Add to favorites</button>
    </section>
  );
};

export default IngredientTotal;
