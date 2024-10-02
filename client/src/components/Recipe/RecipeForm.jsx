import React, { useState } from 'react';

const RecipeForm = ({ initialValues = {}, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
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
