import { useEffect, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function FetchApi() {
  const { setPlanetName } = useContext(PlanetContext);
  useEffect(() => {
    const getPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const data = await response.json();
        const resultsFiltered = Object.keys(data).filter((item) => item !== 'residents');
        setPlanetName(resultsFiltered);
        console.log(resultsFiltered);
      } catch (error) {
        console.log(error);
      }
    };
    getPlanets();
  }, [setPlanetName]);
}

export default FetchApi;
