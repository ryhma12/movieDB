import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SingleView from "./pages/SingleView";
import MainNav from "./components/MainNav";
import PlaceHolderOne from "./pages/PlaceHolderOne";
import Showtimes from "./pages/Showtimes";
import TintLayer from "./components/TintLayer";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        {selectedMovie && <TintLayer />}
        <MainNav setSelectedMovie={setSelectedMovie} />
        <Routes>
          <Route path="/placeholderone" element={<PlaceHolderOne />} />
          <Route path="/Showtimes" element={<Showtimes />} />

          <Route
            path="/moviepreview"
            element={
              selectedMovie ? (
                <SingleView
                  selectedMovie={selectedMovie}
                  setSelectedMovie={setSelectedMovie}
                />
              ) : (
                // needs error handling component at some point
                <></>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
