import Showtime from "./Showtime";
import { useEffect, useState } from "react"
import { XMLParser } from "fast-xml-parser";

const ShowtimesSection = () => {
  const [showtimesData, setShowtimesData] = useState([])

  const xmlToJsonObj = async (xml) => {
    try {
      const options = {
        ignoreAttributes: false,
      }
      const parser = new XMLParser(options);
      const xmlText = await xml.text();
      const jObj = parser.parse(xmlText);
      return jObj;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://www.finnkino.fi/xml/Schedule/"
        );
        const parsedData = await xmlToJsonObj(res);
        const shows = parsedData.Schedule.Shows.Show;
        setShowtimesData(shows);
      } catch (error) {
        console.log(error);
      };
    })();
  }, []);

  return (
    <div className="ShowtimesSection">
      <ul>
        {showtimesData.filter((show) => show.Title === "Gladiator II").map((show) => (
          <Showtime key={show.ID} data={{ time: show.dttmShowStart, place: show.Theatre }} />
        ))}
      </ul>
    </div>
  );
};

export default ShowtimesSection;