import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { FavouritesProvider } from "./context/FavouritesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </UserProvider>
  </React.StrictMode>
);
