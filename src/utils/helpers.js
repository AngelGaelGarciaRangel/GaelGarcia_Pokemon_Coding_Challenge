export function sortData(data, sort) {
  console.log(sort)
  const sortedList = [...data];

  if (sort === 'nameAZ') {
    sortedList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'nameZA') {
    sortedList.sort((a, b) => b.name.localeCompare(a.name));
  }

  return sortedList; 
}

export function filterData(data, filter) {
  return data.filter(pokemon => {
    const pokemonName = pokemon.name.toLowerCase();
    const searchQuery = filter.toLowerCase();
    return pokemonName.startsWith(searchQuery);
  });
}
