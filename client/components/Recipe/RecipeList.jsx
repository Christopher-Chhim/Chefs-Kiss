import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onKiss }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onKiss={onKiss} />
      ))}
    </div>
  );
};

export default RecipeList;
