import { useNavigate } from "react-router-dom";

const NavMenu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  const handleNav = (e) => {
    setMenuOpen(false);
    const location = e.target.dataset.location;

    if (location === "pc1") {
      navigate("/placeholderone");
    } else {
      navigate("/placeholdertwo");
    }
  };

  return (
    <div className={menuOpen ? "NavMenu open" : "NavMenu"}>
      <div
        className="menu--section"
        data-location="pc1"
        onClick={(e) => handleNav(e)}
      >
        Testi navi
      </div>
      <div
        className="menu--section"
        data-location="pc2"
        onClick={(e) => handleNav(e)}
      >
        Testi navi
      </div>
    </div>
  );
};

export default NavMenu;
