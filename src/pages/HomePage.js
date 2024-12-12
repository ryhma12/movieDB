import tmdb from "../assets/tmdb.svg";
import Carousel from "../components/Carousel";

const HomePage = ({ setSelectedMovie }) => {
  return (
    <div className="homepage">
      <Carousel name="Top rated" setSelectedMovie={setSelectedMovie}></Carousel>
      <Carousel
        name="Top rated 2"
        setSelectedMovie={setSelectedMovie}
      ></Carousel>
    </div>
  );
};

export default HomePage;
