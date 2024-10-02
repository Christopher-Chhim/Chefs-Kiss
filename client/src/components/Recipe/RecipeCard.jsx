import React from 'react';
// import chefsKiss from "../../images/Chef's-Kiss Emoji.png";

const RecipeCard = ({ recipe, onKiss }) => {
  return (
    <div className="card">
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <p>Kisses: {recipe.kisses}</p>
      <button onClick={() => onKiss(recipe.id, "chef's-kiss")}>
        {/* <img src={chefsKiss} alt="chefsKiss" style={{ width: '20px', height: '20px' }}></img> */}
      </button>
    </div>
  );
};

export default RecipeCard;
