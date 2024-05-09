import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const AdminProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    currentUser,
    setCurrentUser,
    isLoading,
  };
  useEffect(() => {

    if (localStorage.getItem('token')) {
      const user = localStorage.getItem("user");
      if (user) {
        setCurrentUser(JSON.parse(user));

      }
    }
  }, []);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
