import { useState } from "react";
import './pokemonCard.css'
import { FaHeart, FaRegHeart } from "react-icons/fa";

const PokemonCard = ({ pokemon }) => {
  const [favorite, setFavorite] = useState(false);

  function handleFavoriteToggle() {
    setFavorite(!favorite);
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
