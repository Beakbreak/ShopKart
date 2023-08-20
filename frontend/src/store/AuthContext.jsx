import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthProvider = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState({
    user: null,
    isAuthenticated: null,
    loading: true,
  });

  const validateToken = async () => {
    try {
      if (true) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/me`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.status == 200) {
          setUser({
            isAuthenticated: true,
            userData: response.data.data,
            loading: false,
          });
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        setUser({
          isAuthenticated: false,
          userData: null,
          loading: false,
        });
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthProvider.Provider
      value={{
        user,
        setUser,
        validateToken,
      }}
    >
      {props.children}
    </AuthProvider.Provider>
  );
};
export default AuthContextProvider;
