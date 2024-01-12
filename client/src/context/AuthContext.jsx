import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import * as authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      console.log("Tentativa de login para o usuário:", username);

      const token = await authService.authenticateUser(username, password);
      setAuthToken(token);
      setAuthenticated(true);

      console.log("Login bem-sucedido para o usuário:", username);

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro durante a autenticação:", error.message);
      throw error;
    }
  };

  const logout = () => {
    clearAuthToken();
    setAuthenticated(false);

    console.log("Usuário deslogado");
  };

  const setAuthToken = (token) => {
    authService.setAuthToken(token);
    console.log("Token definido:", token);
  };

  const clearAuthToken = () => {
    authService.clearAuthToken();
    console.log("Token removido");
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
