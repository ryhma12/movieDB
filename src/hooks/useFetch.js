import { useState, useEffect } from "react";

//Käyttö:
//importtaa useFetch
//destrukturoi tarvittavat tiedot useFetchistä: data, error ja isLoading
//tarvittaessa uudelleennimeä näin (jos pitää kutsua monesti eri osoitteilla samasta komponentista):
//  const { data: uusiData } = useFetch(url)

const useFetch = (url, apiName) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return setError("No url");

    const fetchFromAPI = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${url}`);
        if (!res.ok) throw new Error(res.status);

        let dt = {};
        switch(apiName){
          case "finnkino":
            dt = await res.text();
            break;
          default: 
            dt = await res.json();
            break;
        }
        setData(dt);
      } catch (error) {
        setError(error);
      } finally {
        //tätä isLoading voijaa käyttää loading animaatioitten renderöintiin ku se on aina true jos haku on päällä ja menee heti haun jälkeen takas false
        setIsLoading(false);
      }
    };
    fetchFromAPI();
  }, [url, apiName]);

  return { data, error, isLoading };
};

export default useFetch;
