import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [planetName, setPlanetName] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [numericalFilter, setNumericalFilter] = useState(0);
  const [compairFilter, setCompairFilter] = useState('maior que');
  const [orderItem, setOrderItem] = useState([]);
  const [filterByName, setFilterByName] = useState([]);
  const [filters, setFilters] = useState({});

  const values = useMemo(() => ({
    planetName,
    setPlanetName,
    columnFilter,
    setColumnFilter,
    numericalFilter,
    setNumericalFilter,
    compairFilter,
    setCompairFilter,
    orderItem,
    setOrderItem,
    filterByName,
    setFilterByName,
    filters,
    setFilters,
  }), [
    planetName,
    setPlanetName,
    columnFilter,
    setColumnFilter,
    numericalFilter,
    setNumericalFilter,
    compairFilter,
    setCompairFilter,
    orderItem,
    setOrderItem,
    filterByName,
    setFilterByName,
    filters,
    setFilters]);

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
