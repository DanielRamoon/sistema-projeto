let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const getAuthToken = () => {
  return authToken;
};

export const isAuthenticated = () => {
  return authToken !== null;
};

export const clearAuthToken = () => {
  authToken = null;
};

export const authenticateUser = async (token) => {
  setAuthToken(token);
  return token;
};
