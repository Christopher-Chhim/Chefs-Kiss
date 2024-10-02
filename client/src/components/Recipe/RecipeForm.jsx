import React, { useState } from 'react';
import { POST_RECIPE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const RecipeForm = ({ initialValues = {}, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [addRecipe] = useMutation(POST_RECIPE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues)
    const postResponse = await addRecipe({
      variables: {
        title: formValues.title,
        description: formValues.description,
        ingredients: formValues.ingredients,
        instructions: formValues.instructions
      }
    });
    console.log(postResponse)
    window.location.assign('/profile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={formValues.title || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Description</label>
        <input type="text" name="description" value={formValues.description || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Ingredients</label>
        <textarea name="ingredients" value={formValues.ingredients || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Instructions</label>
        <textarea name="instructions" value={formValues.instructions || ''} onChange={handleChange} />
      </div>
      <button type="submit">Submit Recipe</button>
    </form>
  );
};

export default RecipeForm;
