import { useNavigate } from "react-router-dom";

const NavMenu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  const handleNav = (e) => {
    setMenuOpen(false);
    const location = e.target.dataset.location;

    navigate(`/${location}`);
  };

  return (
    <div className={menuOpen ? "NavMenu open" : "NavMenu"}>
      <div className="menu--section">
        <span data-location="placeholderone" onClick={(e) => handleNav(e)}>
          Testi navi
        </span>
      </div>
      <div className="menu--section">
        <h2>Showtimes</h2>
        <span data-location="showtimes" onClick={(e) => handleNav(e)}>
          Finnkino
        </span>
      </div>
      <div className="menu--section">
        <span data-location="favourites" onClick={(e) => handleNav(e)}>
          Favourites
        </span>
      </div>
      <div className="menu--section">
        <h2>Movies</h2>
        <span data-location="browse" onClick={(e) => handleNav(e)}>
          Browse Genres
        </span>
      </div>
    </div>
  );
};

export default NavMenu;
