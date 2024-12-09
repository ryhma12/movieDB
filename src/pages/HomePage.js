import React from "react";
import tmdb from "../assets/tmdb.svg"
const HomePage = () => {
  return (
  <div style={{marginTop: '100%', marginLeft: '0%'}}>
    <h3>datasource:</h3>
 <img className="Photo" src={tmdb} width={150} height={40} alt="tmdb Logo"/>
 </div>
);
};

export default HomePage;
