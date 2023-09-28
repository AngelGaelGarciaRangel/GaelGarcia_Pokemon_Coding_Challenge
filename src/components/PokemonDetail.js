import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import { Card } from 'antd';
import { useParams } from 'react-router-dom';

function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchData(`/pokemon/${id}`)
      .then(data => setPokemon(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card 
        style={{ width: 300 }}
        cover={<img alt={pokemon.name} src={pokemon.sprites?.front_default} />}
      >
        <Card.Meta 
          title={pokemon.name} 
          description={
            <>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
            </>
          }
        />
      </Card>
    </div>
  );
}

export default PokemonDetail;
