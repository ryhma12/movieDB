import Showtime from "./Showtime";
import { useEffect, useState } from "react"
import { XMLParser } from "fast-xml-parser";
import SingleView from "../pages/SingleView";

const ShowtimesSection = ({item}) => {
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
        
        {showtimesData.filter((show) => show.Title === item.original_title).map((show) => (
          <Showtime key={show.ID} data={{ time: show.dttmShowStart, place: show.Theatre }} />
        ))}
      </ul>
    </div>
  );
};

export default ShowtimesSection;