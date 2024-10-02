import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes = [], onKiss }) => {
  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onKiss={onKiss} />
        ))
      ) : (
        <p>No recipes available. Please add some recipes to get started!</p>
      )}
    </div>
  );
};

export default RecipeList;
