// client/src/context/AuthContext.jsx
import React, { createContext, useReducer, useEffect } from 'react';
import { register as apiRegister, login as apiLogin } from '../services/api';

const initialState = {
  token: localStorage.getItem('token') || null,
  user:  null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { token: action.payload.token, user: action.payload.user };
    case 'LOGOUT':
      return { token: null, user: null };
    default:
      return state;
  }
}

export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // If there’s a token in localStorage, you could fetch the user’s info here
  useEffect(() => {
    if (state.token) {
      // Optionally, decode token or call an endpoint to get user
      // set state.user accordingly
    }
  }, [state.token]);

  const register = async (name, email, password) => {
    const res = await apiRegister({ name, email, password });
    localStorage.setItem('token', 'Bearer ' + res.data.token);
    dispatch({ type: 'LOGIN', payload: res.data });
  };

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    localStorage.setItem('token', 'Bearer ' + res.data.token);
    dispatch({ type: 'LOGIN', payload: res.data });
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
