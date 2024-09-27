import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';


const GIVE_CHEF_KISS = gql`
  mutation giveChefKiss($recipeId: ID!, $userId: ID!) {
    giveChefKiss(recipeId: $recipeId, userId: $userId) {
      _id
      chefKissCount
      favourites {
        _id
        title
      }
    }
  }
`;

const Recipe = ({ recipe, userId }) => {
  const [kissCount, setKissCount] = useState(recipe.chefKissCount);


  const [giveChefKiss] = useMutation(GIVE_CHEF_KISS, {
    variables: { recipeId: recipe._id, userId },
    onCompleted: (data) => {
      
      setKissCount(data.giveChefKiss.chefKissCount);
      console.log('Recipe added to favorites:', data.giveChefKiss.favourites);
    },
    onError: (error) => {
      console.error('Error giving Chef’s Kiss:', error);
    },
  });

 
  const handleKiss = () => {
    giveChefKiss();
  };

  return (
    <div className="recipe-container">
      {/* Recipe image */}
      {recipe.photoUrl && <img src={recipe.photoUrl} alt={recipe.title} className="recipe-image" />}

      {/* Recipe title */}
      <h1 className="recipe-title">{recipe.title}</h1>

      {/* Author and Chef's Kiss count */}
      <div className="recipe-meta">
        <p><strong>Author:</strong> {recipe.user.firstName} {recipe.user.lastName}</p>
        <p><strong>Chef's Kiss Count:</strong> 💋 {kissCount}</p>
      </div>

      {/* Recipe description */}
      {recipe.description && <p>{recipe.description}</p>}

      {/* Ingredients */}
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>

      {/* Interactions (Chef's Kiss button) */}
      <div className="recipe-interactions">
        <button className="kiss-button" onClick={handleKiss}>💋 Give a Chef's Kiss</button>
      </div>
    </div>
  );
};

export default Recipe;