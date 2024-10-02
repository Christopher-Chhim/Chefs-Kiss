import React, { useEffect, useState } from 'react';

const RecipeDetail = ({ recipeId, onVote, comments, onAddComment }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    
    fetch(`/api/recipes/${recipeId}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [recipeId]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Kisses: {recipe.kisses}</p>
      <button onClick={() => onKiss(recipe.id, "chef's-kiss")}>
        <img src={chefsKiss} alt="chefsKiss" style={{ width: '20px', height: '20px' }}></img>
      </button>

      {/* Comment Section */}
      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
        <form onSubmit={onAddComment}>
          <input type="text" name="comment" placeholder="Add a comment..." />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeDetail;
