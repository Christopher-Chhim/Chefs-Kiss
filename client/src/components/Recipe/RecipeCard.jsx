const RecipeCard = ({ recipe, onKiss }) => {
  return (
    <div className="card">
      <h3>{recipe.title}</h3>
      <p>Description: {recipe.description}</p>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
      
      {/* Only show the button if onKiss is not null or undefined */}
      {onKiss && (
        <>
        <p>Kisses: {recipe.kisses}</p>
        <button onClick={() => onKiss(recipe.id, "chef's-kiss")}>
          {/* <img src={chefsKiss} alt="chefsKiss" style={{ width: '20px', height: '20px' }}></img> */}
          Give a Chef's Kiss
        </button>
        </>
      )}
    </div>
  );
};
export default RecipeCard;