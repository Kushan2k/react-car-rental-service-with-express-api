import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/v1/users";

export const CustomerContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const CustomerProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
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
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};
