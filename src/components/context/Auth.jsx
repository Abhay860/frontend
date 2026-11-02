import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
 const storedUser = localStorage.getItem("userInfo");

const [user, setUser] = useState(
  storedUser ? JSON.parse(storedUser) : null
);
 const login = (userData) => {
  localStorage.setItem("userInfo", JSON.stringify(userData));
  setUser(userData);
};
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  }
  
  return <AuthContext.Provider value={{
    user,
    login,
    logout
  }}>
    {children}
  </AuthContext.Provider>
}