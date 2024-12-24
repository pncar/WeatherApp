import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [tempType,setTempType] = useState(()=>{
    return(localStorage.getItem("tempType") || "C");
  });
  const [lang,setLang] = useState("en");

  useEffect(()=>{
    localStorage.setItem("tempType",tempType);
  },[tempType]);

  return (
    <UserContext.Provider value={{ tempType, setTempType, lang, setLang }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}