import PokemonCard from "./components/PokemonCard";
import { useOutletContext } from "react-router-dom";

const Favorites = () => {
  const { favoritePokemons, favorites, onToggle } = useOutletContext();


  return (
    <>
      <h1>Favorites</h1>
      <section className="pokemon-page">
        {favoritePokemons.length > 0 ? (
          favoritePokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onToggle={onToggle}
              isFavorite={true} />
          ))
        ) : (
          <p>No hay Pokémon favoritos.</p>
        )}
      </section>
    </>
  )
}

export default Favorites
