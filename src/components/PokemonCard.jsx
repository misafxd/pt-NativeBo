import { useState, useEffect } from "react";
import './pokemonCard.css'
import { FaHeart, FaRegHeart } from "react-icons/fa";

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchPokemon = async function () {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/diglett');
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();

        const pokemonData = {
          name: data.name,
          image: data.sprites.front_shiny || data.sprites.front_default,
          type: data.types[0].type.name,
          stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
          }
        }
        console.log(pokemonData)
        setPokemon(pokemonData);
      } catch (e) {
        console.error("Error: ", e);
        setError("No se pudo cargar el Pokémon.");
      }
    };
    fetchPokemon();
  }, []);

  function handleFavoriteToggle() {
    setFavorite(!favorite);
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={pokemon ? pokemon.type + " card" : "card"}>
      <div>
        <button className="favorite" type="button" onClick={handleFavoriteToggle}>
          {favorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        {pokemon && <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />}
      </div>
      <p className="pokemon-name">{pokemon ? pokemon.name : "Cargando..."}</p>
      <p className="pokemon-type">{pokemon ? pokemon.type : "Cargando..."}</p>
      <div className="stats">
        {pokemon && (
          <>
            <div>
              <p>Hp </p>
              <p>{pokemon.stats.hp}</p>
            </div>
            <div>
              <p>Attack</p>
              <p>{pokemon.stats.attack}</p>
            </div>
            <div>
              <p>Defense </p>
              <p>{pokemon.stats.defense}</p>
            </div>
            <div>
              <p>S/Attack</p>
              <p>{pokemon.stats.specialAttack}</p>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
