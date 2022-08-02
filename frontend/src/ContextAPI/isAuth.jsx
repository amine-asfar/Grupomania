import React from "react";

export const userAuthContext = React.createContext();

export const UserAuthState = ({ children }) => {
  return (
    <userAuthContext.Provider
      value={React.useState(Boolean(localStorage.getItem("user")))}
    >
      {children}
    </userAuthContext.Provider>
  );
};
