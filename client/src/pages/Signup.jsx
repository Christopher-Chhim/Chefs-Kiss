import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Inline styles for form layout
  const containerStyle = {
    width: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff6347',
    border: 'none',
    color: 'white',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#e5533d',
  };

  const linkStyle = {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    color: '#ff6347',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Signup</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            style={inputStyle}
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            style={inputStyle}
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            style={inputStyle}
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pwd">Password:</label>
          <input
            style={inputStyle}
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Submit
        </button>
      </form>

      <Link to="/login" style={linkStyle}>
        ← Go to Login
      </Link>
    </div>
  );
}

export default Signup;