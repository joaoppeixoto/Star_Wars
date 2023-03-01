const getPlanets = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    const resultsFiltered = data.results.map(({ residents, ...rest }) => rest);
    return resultsFiltered;
  } catch (error) {
    console.log(error);
  }
};

export default getPlanets;
