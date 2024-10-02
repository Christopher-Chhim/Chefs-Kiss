import React, { useState } from 'react';
import { POST_RECIPE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const RecipeForm = ({ initialValues = {}, onSubmit }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [addRecipe] = useMutation(POST_RECIPE);
  const [notification, setNotification] = useState(false);  // State for notification

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postResponse = await addRecipe({
        variables: {
          title: formValues.title,
          description: formValues.description,
          ingredients: formValues.ingredients,
          instructions: formValues.instructions,
        },
      });

      console.log(postResponse);

      // Show success notification after submission
      setNotification(true);

      // Redirect to profile after 2 seconds
      setTimeout(() => {
        window.location.assign('/profile');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

  // Inline Styles
  const formContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
    fontSize: '1.1em',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    height: '100px',
  };

  const buttonStyle = {
    backgroundColor: '#ff6347',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#e5533d',
  };

  const notificationStyle = {
    padding: '10px 20px',
    backgroundColor: '#4BB543',
    color: 'white',
    textAlign: 'center',
    borderRadius: '5px',
    marginBottom: '20px',
  };

  return (
    <div style={formContainerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        {notification && (
          <div style={notificationStyle}>
            Recipe submitted successfully! Redirecting to profile...
          </div>
        )}
        <div>
          <label style={labelStyle}>Title</label>
          <input
            type="text"
            name="title"
            value={formValues.title || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <input
            type="text"
            name="description"
            value={formValues.description || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Ingredients</label>
          <textarea
            name="ingredients"
            value={formValues.ingredients || ''}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Instructions</label>
          <textarea
            name="instructions"
            value={formValues.instructions || ''}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;