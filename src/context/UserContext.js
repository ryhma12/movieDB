import { useEffect, createContext, useReducer } from "react";

export const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  useEffect(() => {
    try {
      const oldUser = JSON.parse(sessionStorage.getItem("user"));
      if (oldUser) {
        dispatch({ type: "LOGIN", payload: oldUser });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
