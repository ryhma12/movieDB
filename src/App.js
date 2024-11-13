import { useState } from "react";
import SingleView from "./pages/SingleView";
import MainNav from "./components/MainNav";

function App() {
  const [singleView, setSingleView] = useState(false);

  return (
    <div className="App">
      <MainNav setSingleView={setSingleView} />
      <div className="App--content__container">
        {singleView && (
          <SingleView singleView={singleView} setSingleView={setSingleView} />
        )}
      </div>
    </div>
  );
}

export default App;
