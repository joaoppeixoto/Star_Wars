import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanets from '../services/FetchApi';

function PlanetProvider({ children }) {
  const [planetName, setPlanetName] = useState([]);
  const [planetFilter, setPlanetFilter] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getPlanets();
      setPlanetName(response);
    };
    fetchApi();
  }, []);

  const values = useMemo(() => ({
    planetName,
    setPlanetName,
    planetFilter,
    setPlanetFilter,

  }), [
    planetName,
    planetFilter,

  ]);
  return (
    <main>
      <PlanetContext.Provider value={ values }>{ children }</PlanetContext.Provider>
    </main>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default PlanetProvider;
