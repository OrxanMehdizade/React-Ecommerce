import {createContext,useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(0);

  return (
    <Context.Provider value={{accessToken, setAccessToken}}>
        {children}
    </Context.Provider>
  );
};
