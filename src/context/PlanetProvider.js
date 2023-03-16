import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getPlanets from '../services/FetchApi';

function PlanetProvider({ children }) {
  const [planetName, setPlanetName] = useState([]);
  const [planetFilter, setPlanetFilter] = useState('');
  const [selected, setSelected] = useState({
    numericalValue: 0,
    collumn: 'population',
    condition: 'maior que',
  });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [attributesFilter, setAttributesFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [order, setOrder] = useState({ order: { column: 'population', sort: 'ASC' } });

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
    selected,
    setSelected,
    selectedFilters,
    setSelectedFilters,
    attributesFilter,
    setAttributesFilter,
    order,
    setOrder,

  }), [
    planetName,
    planetFilter,
    selected,
    selectedFilters,
    attributesFilter,
    order,

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
