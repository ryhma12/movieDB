import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SingleView from "./pages/SingleView";
import MainNav from "./components/MainNav";
import PlaceHolderOne from "./pages/PlaceHolderOne";
import PlaceHolderTwo from "./pages/PlaceHolderTwo";
import TintLayer from "./components/TintLayer";
import BrowseMovies from "./pages/BrowseMovies";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(false);

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
          <Route path="/placeholderone" element={<PlaceHolderOne />} />
          <Route path="/placeholdertwo" element={<PlaceHolderTwo />} />
          <Route
            path="/browse"
            element={<BrowseMovies setSelectedMovie={setSelectedMovie} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
