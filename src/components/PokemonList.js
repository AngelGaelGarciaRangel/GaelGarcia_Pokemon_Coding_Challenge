import React, { useState, useEffect } from 'react';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';
import { fetchData } from '../utils/api';

function PokemonList() {
  const [pokemonData, setPokemonData] = useState(null);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('nameAZ');

  useEffect(() => {
    fetchData('/pokemon')
      .then(data => {
        setPokemonData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    if (!pokemonData) return;

    const pokemonWithId = pokemonData.results.map((poke, index) => ({
      ...poke,
      id: index + 1,
    }));
    setPokemon(pokemonWithId);
  }, [pokemonData]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  }

  const handleSortChange = (newSort) => {
    setSort(newSort);
  }

  const filteredPokemon = filterData(pokemon, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      <List
        style={{ background: '#f5f5f5', borderRadius: '10px', padding: '20px' }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedPokemon}
        renderItem={poke => (
          <List.Item>
            <Link to={`/pokemon/${poke.id}`}>
              <Card
                hoverable
                style={{ borderRadius: '10px', transition: 'all 0.3s ease' }}
                cover={<img alt={poke.name} src={"https://freepngimg.com/download/pokemon/20250-9-pokeball-photo.png"} />}
                bodyStyle={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card.Meta title={poke.name.toUpperCase()} style={{ textAlign: 'center' }} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}

export default PokemonList;
