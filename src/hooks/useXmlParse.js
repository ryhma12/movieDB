import { XMLParser } from "fast-xml-parser";
import { useState, useEffect } from "react";

// usage example:  const {
//   data: shows = [],
//   error: showtimesError,
//   isParsing: showtimesIsParsing,
// } = useXmlParse(showtimeData, "Schedule.Shows.Show");
// options: https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md

const useXmlParse = (xml, path, options) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  useEffect(() => {
    const parse = () => {
      try {
        if (xml.length === 0) return;
        setIsParsing(true);
        const parser = new XMLParser(options);
        const jObj = parser.parse(xml);
        const parsedData = path
          .split(".")
          .reduce((obj, key) => obj?.[key], jObj);
        setData(parsedData);
      } catch (error) {
        setError(error);
      } finally {
        setIsParsing(false);
      }
    };
    parse();
  }, [xml, path, options]);

  return { data, error, isParsing };
};

export default useXmlParse;
