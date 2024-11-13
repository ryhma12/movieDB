import { useState } from "react";
import BestMatch from "./BestMatch";
import Alternatives from "./Alternatives";

const MainNav = ({ setSingleView }) => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const key = "dabc269bb40e53985b7ee5c3fd6568a4";

  const handleSearch = async (e) => {
    setText(e.target.value);
    const txt = e.target.value;
    if (!txt) return setData([]);

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${txt}&api_key=${key}&include_adult=false&language=en-US&page=1`
    );
    const data = await res.json();

    const newArr = data.results.filter(
      (item) => item.original_language === "en"
    );

    setData(newArr);
    console.log(data);
  };

  const handleSingleView = (item) => {
    setSingleView(item);
  };

  return (
    <div className="MainNav">
      <input type="text" value={text} onChange={(e) => handleSearch(e)} />

      <div
        className={
          data.length > 0
            ? "search--results__container"
            : "search--results__container hidden"
        }
      >
        {data.length === 1 ? (
          <BestMatch
            item={data[0]}
            maxWidth={true}
            handleSingleView={handleSingleView}
          />
        ) : (
          <>
            <BestMatch
              item={data[0]}
              maxWidth={false}
              handleSingleView={handleSingleView}
            />
            <Alternatives
              data={[...data].slice(1)}
              handleSingleView={handleSingleView}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MainNav;
