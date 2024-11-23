import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BestMatch from "../BestMatch";
import Alternatives from "../Alternatives";
import NavMenu from "./NavMenu";

import hamburger from "../../assets/hamburger.svg";
import Logo from "../../assets/Logo.png";
import searchSVG from "../../assets/search.svg";

const MainNav = ({ setSelectedMovie }) => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    setText(e.target.value);

    const txt = e.target.value;
    if (!txt) return setData([]);

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${txt}&api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&language=en-US&page=1`
    );
    const data = await res.json();

    const newArr = data.results.filter(
      (item) => item.original_language === "en"
    );

    setData(newArr);
  };

  const handleSingleView = (item) => {
    setSelectedMovie(item);
    //   navigate("/moviepreview");
  };

  return (
    <>
      <NavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="MainNav">
        <ul>
          <li className="nav__logo--container">
            <img src={Logo} alt="logo--icon" />
          </li>
          <li>
            <div
              className="menu__btn nav__btn"
              onClick={(e) => setMenuOpen(!menuOpen)}
            >
              <img src={hamburger} alt="menu--icon" />
              <span>Menu</span>
            </div>
          </li>
          <li className="nav__searchbar">
            <input type="text" value={text} onChange={(e) => handleSearch(e)} />
            <div className="nav__btn search--btn">
              <img src={searchSVG} alt="search--icon" />
            </div>
          </li>
          <li className="login--buttons">
            <button className="login">Login</button>
            <button className="sign--up">Sign up</button>
          </li>
        </ul>

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
                // create a shallow copy of data array and remove the best match movie from it
                data={[...data].slice(1)}
                handleSingleView={handleSingleView}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainNav;