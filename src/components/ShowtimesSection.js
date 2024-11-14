import Showtime from "./Showtime";
import { useEffect, useState } from "react"
import { XMLParser } from "fast-xml-parser";

const ShowtimesSection = () => {
  const [showtimesData, setShowtimesData] = useState([])

  const xmlToShowtimes = async (title, xml) => {
    try {
      const options = {
        ignoreAttributes: false,
      }
      const parser = new XMLParser(options);
      const xmlText = await xml.text();
      const jObj = parser.parse(xmlText);
      const shows = jObj.Schedule.Shows.Show;

      const filteredShows = shows
        .filter((show) => (show.Title === title))
        .map((show) => ({
          id: show.ID,
          time: show.dttmShowStart,
          place: show.Theatre,
        }));
      return filteredShows;
    } catch (error) {
      throw (error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const testTitleIWantToShowTimeFor = "Gladiator II";

        const cache = sessionStorage.getItem(testTitleIWantToShowTimeFor);
        if (cache) {
          setShowtimesData(JSON.parse(cache));
          return;
        }
        const res = await fetch(
          "https://www.finnkino.fi/xml/Schedule/"
        );
        const parsedData = await xmlToShowtimes(testTitleIWantToShowTimeFor, res);
        sessionStorage.setItem(testTitleIWantToShowTimeFor, JSON.stringify(parsedData));
        setShowtimesData(parsedData);
      } catch (error) {
        console.log(error);
      };
    })();
  }, []);

  return (
    <div className="ShowtimesSection">
      <ul>
        {showtimesData.map((show) => (
          <Showtime key={show.id} data={show} />
        ))}
      </ul>
    </div>
  );
};

export default ShowtimesSection;