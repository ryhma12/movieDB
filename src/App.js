import { useState } from "react";
import SingleView from "./pages/SingleView";
import MainNav from "./components/MainNav";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(false);

  return (
    <div className="App">
      <MainNav setSelectedMovie={setSelectedMovie} />
      <div className="App--content__container">
        {selectedMovie && (
          <SingleView selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
        )}
      </div>
    </div>
  );
}

export default App;
