import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SingleView from "./pages/SingleView";
import MainNav from "./components/MainNav";
import PlaceHolderOne from "./pages/PlaceHolderOne";
import PlaceHolderTwo from "./pages/PlaceHolderTwo";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <MainNav setSelectedMovie={setSelectedMovie} />
        <Routes>
          <Route path="/placeholderone" element={<PlaceHolderOne />} />
          <Route path="/placeholdertwo" element={<PlaceHolderTwo />} />

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
