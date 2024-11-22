import { useState } from "react";
import useFetch from "../hooks/useFetch";

import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import chevRight from "../assets/chevRight.svg";
import chevLeft from "../assets/chevLeft.svg";
import Dropdown from "../components/Dropdown";

const BrowseMoviesByGenre = ({ selectedGenre, setSelectedMovie }) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");
  const { data, error, isLoading } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${selectedGenre.id}&sort_by=${sort}&language=en-US&page=${page}`
  );

  const handleSort = (index) => {
    switch (index) {
      case 0:
        setSort("popularity.desc");
        break;
      case 1:
        setSort("popularity.asc");
        break;
      case 2:
        setSort("release_date.desc");
        break;
      case 3:
        setSort("release_date.asc");
        break;
      case 4:
        setSort("vote_average.desc");
        break;
      case 5:
        setSort("vote_average.asc");
        break;
      default:
        setSort("popularity.desc");
        break;
    }
  };

  return (
    <div className="BrowseMoviesByGenre">
      <Filter />
      <div className="content--container">
        <div className="header">
          <div className="header--content">
            <h2>{selectedGenre.name}</h2>
            <Dropdown
              options={[
                "Sort by popularity desc",
                "Sort by popularity asc",
                "Sort by release date desc",
                "Sort by release date asc",
                "Sort by average rating desc",
                "Sort by average rating asc",
              ]}
              handleSort={handleSort}
              dropdownName={"Sort by"}
            />
          </div>
        </div>
        {isLoading && <Loading />}
        <div className="movies--container">
          {!isLoading &&
            data.results &&
            data.results.map((el) => (
              <ProductCard
                item={el}
                interActive={true}
                setSelectedMovie={setSelectedMovie}
              />
            ))}
        </div>
        <div className="pagination">
          <div className="btn">
            <img
              src={chevLeft}
              alt="chevron"
              onClick={() => setPage(page - 1)}
            />
          </div>
          <span>
            {page} / {data.total_pages}
          </span>
          <div className="btn">
            <img
              src={chevRight}
              alt="chevron"
              onClick={() => setPage(page + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseMoviesByGenre;
