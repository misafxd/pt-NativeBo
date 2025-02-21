import './pokemonCard.css'
import { FaHeart, FaRegHeart } from "react-icons/fa";

const PokemonCard = ({ pokemon, onToggle, isFavorite }) => {

  function handleFavoriteToggle() {
    onToggle(pokemon.id)
  }

  return (
    <div className={pokemon ? pokemon.type + " card" : "card"}>
      <div className='pokemon-description'>
        <p className="pokemon-name">{pokemon ? pokemon.name : "Cargando..."}</p>
        <p className="pokemon-type">{pokemon ? pokemon.type : "Cargando..."}</p>
        {pokemon && <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />}

      </div>
      <div>
        <button className="favorite" type="button" onClick={handleFavoriteToggle}>
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="stats">
        {pokemon && (
          <>
            <div>
              <p>HP </p>
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
