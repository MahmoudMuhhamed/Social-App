// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://route-posts.routemisr.com/users/profile-data", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      }
    })
    .then((res) => {
      setUserData(res?.data?.data?.user);  // { name, photo, username, ... }
      
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ userData, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easy access
export function useUser() {
  return useContext(UserContext);
}