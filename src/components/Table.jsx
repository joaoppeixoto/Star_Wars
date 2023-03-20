import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const {
    planetName,
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
  } = useContext(PlanetContext);

  const tratmentFilters = () => {
    const filteredPlanetsByName = planetName
      .filter(({ name }) => name.toUpperCase().includes(planetFilter.toUpperCase()));
    const filteredPlanetsByNameAndCondition = filteredPlanetsByName.filter((planet) => {
      const filterPlanet = selectedFilters
        .map(({ collumn, condition, numericalValue }) => {
          switch (condition) {
          case 'maior que':
            return Number(planet[collumn]) > (Number(numericalValue));
          case 'menor que':
            return Number(planet[collumn]) < (Number(numericalValue));
          case 'igual a':
            return Number(planet[collumn]) === (Number(numericalValue));
          default: return true;
          }
        });
      return filterPlanet.every((element) => element);
    });
    return filteredPlanetsByNameAndCondition;
  };
  const deleteOptions = () => {
    setSelectedFilters([...selectedFilters, selected]);
    const decreaseOptions = attributesFilter
      .filter((attribute) => attribute !== selected.collumn);
    setAttributesFilter(decreaseOptions);
    setSelected({
      numericalValue: 0,
      collumn: decreaseOptions[0],
      condition: 'maior que',
    });
  };

  const deleteFilters = (c) => {
    const remove = selectedFilters.filter((filters) => filters.collumn !== c);
    setSelectedFilters(remove);
  };
  // const collumnSort = () => {
  //   const sortFilter = planetName.sort((a, b) => {
  //     const magicNumber = -1;
  //     if (b[order.collumn] === 'unknown') return magicNumber;
  //     if (order.sort === 'ASC') {
  //       return +a[order.collumn] - +b[order.collumn];
  //     }
  //     return +b[order.collumn] - +a[order.collumn];
  //   });
  //   const results = [...sortFilter];
  //   setOrder(results);
  // };

  // const ordered = order.collumn.sort((a, b) => {
  //   a.order.collumn.localCompare(b.order.collumn);
  //  console.log(ordered);
  // });

  return (
    <div>
      <header>
        <select
          data-testid="column-filter"
          value={ selected.collumn }
          onChange={
            (event) => setSelected({ ...selected, collumn: event.target.value })
          }
        >
          {
            attributesFilter.map((aFilter) => (
              <option
                key={ aFilter }
                value={ aFilter }
              >
                { aFilter }
              </option>
            ))
          }
        </select>

        <label>
          <select
            data-testid="comparison-filter"
            value={ selected.condition }
            onChange={
              (event) => setSelected({ ...selected, condition: event.target.value })
            }
          >
            { ['maior que',
              'menor que',
              'igual a',
            ]
              .map((condition) => (
                <option key={ condition } value={ condition }>
                  { condition }
                </option>
              ))}

          </select>
        </label>

        <input
          data-testid="value-filter"
          type="number"
          name="numericalValue"
          value={ selected.numericalValue }
          onChange={
            (event) => setSelected({ ...selected, numericalValue: event.target.value })
          }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ deleteOptions }
        >
          Filtrar

        </button>
        <input
          placeholder="Filtrar por nome"
          data-testid="name-filter"
          name="filter"
          type="text"
          value={ planetFilter }
          onChange={ (event) => setPlanetFilter(event.target.value) }
        />
        <label>
          <select
            data-testid="column-sort"
            value={ order.collumn }
            onChange={ (e) => setOrder(e.target.value) }
          >
            <option value="">Population</option>
            <option value="">Orbital_Period</option>
            <option value="">Diameter</option>
            <option value="">Rotation_Period</option>
            <option value="">Surface_Water</option>
          </select>

          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            id="ASC"
            onChange={ (e) => setOrder(e.target.value) }
          />
          Ascendente

          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            id="DESC"
            onChange={ (e) => setOrder(e.target.value) }
          />
          Descendente
        </label>
        <button
          data-testid="column-sort-button"
          // onClick={ collumnSort }
        >
          Ordenar

        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => setSelectedFilters([]) }
        >
          Remover Filtros
        </button>
        {
          selectedFilters.map((filter) => (
            <div data-testid="filter" key={ filter.collumn }>

              <button
                onClick={ () => deleteFilters(filter.collumn) }
                type="button"
              >
                X
              </button>
              <p>{filter.collumn}</p>
              <p>
                {' '}
                {filter.condition}
              </p>
              <p>
                {' '}
                {filter.numericalValue}
              </p>
            </div>
          ))
        }
      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {tratmentFilters().map((planet, index) => (
            <tr key={ index }>
              <th>{planet.name}</th>
              <th>{planet.rotation_period}</th>
              <th>{planet.orbital_period}</th>
              <th>{planet.diameter}</th>
              <th>{planet.climate}</th>
              <th>{planet.gravity}</th>
              <th>{planet.terrain}</th>
              <th>{planet.surface_water}</th>
              <th>{planet.population}</th>
              <th>{planet.films}</th>
              <th>{planet.created}</th>
              <th>{planet.edited}</th>
              <th>{planet.url}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
