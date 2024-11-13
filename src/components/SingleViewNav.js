const SingleViewNav = ({ handleNav }) => {
  const handleActive = (e) => {
    document.querySelectorAll(".nav--btn__container").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.closest(".nav--btn__container").classList.add("active");
    handleNav(e.target.closest(".nav--btn__container").dataset.Page);
  };

  return (
    <div className="SingleViewNav">
      <div
        className="nav--btn__container active"
        onClick={(e) => handleActive(e)}
        data--page="Reviews"
      >
        <span>Reviews</span>
        <span className="active--underline"></span>
      </div>
      <div
        className="nav--btn__container"
        onClick={(e) => handleActive(e)}
        data--page="Showtimes"
      >
        <span>Showtimes</span>
        <span className="active--underline"></span>
      </div>
      <div
        className="nav--btn__container"
        onClick={(e) => handleActive(e)}
        data--page="Cast"
      >
        <span>Cast</span>
        <span className="active--underline"></span>
      </div>
    </div>
  );
};

export default SingleViewNav;
