import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./hooks/useUser";

import SingleView from "./pages/SingleView";
import MainNav from "./components/navigation/MainNav";
import Showtimes from "./pages/Showtimes";
import Favourites from "./pages/Favourites";
import PublicFavourites from "./pages/PublicFavourites";
import TintLayer from "./components/utility/TintLayer";
import BrowseMovies from "./pages/BrowseMovies";
import BrowseMoviesByGenre from "./pages/BrowseMoviesByGenre";
import LoginWindow from "./pages/login/LoginWindow";
import UserSettings from "./pages/UserSettings/UserSettings";
import HomePage from "./pages/HomePage";
import GroupPage from "./pages/group/GroupPage";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMovie, user]);

  return (
    <div className="App">
      <BrowserRouter>
        {selectedMovie && <TintLayer />}
        {selectedMovie && (
          <SingleView
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        )}
        <MainNav setSelectedMovie={setSelectedMovie} />
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <LoginWindow form={"login"} />
                <TintLayer />
              </>
            }
          />
          <Route
            path="/groups"
            element={user ? <GroupPage /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/settings"
            element={user ? <UserSettings /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={
              <>
                <LoginWindow form={"register"} />
                <TintLayer />
              </>
            }
          />
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/favourites/public" element={<PublicFavourites />} />
          <Route
            path="/browse"
            element={
              <BrowseMovies
                setSelectedMovie={setSelectedMovie}
                setSelectedGenre={setSelectedGenre}
              />
            }
          />
          {selectedGenre && (
            <Route
              path={selectedGenre.name.toLowerCase()}
              element={
                <BrowseMoviesByGenre
                  selectedGenre={selectedGenre}
                  setSelectedMovie={setSelectedMovie}
                />
              }
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
