import React, { createContext, useContext, useReducer } from 'react';

// Create a new context for the global state
const StoreContext = createContext();

// Custom hook to use the global state context
const useStoreContext = () => {
  return useContext(StoreContext);
};

// Initial state for the global state
const initialState = {
  isAuthenticated: false,
  user: null,
  cart: [],
};

// Reducer function to handle actions and update state
function reducer(state, action) {
  switch (action.type) {
    case 'SET_AUTHENTICATION':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

// StoreProvider component to wrap around components that need access to global state
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Export custom hook for ease of use in components
export { useStoreContext };
