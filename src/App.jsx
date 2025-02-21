import './App.css'
import PokemonCard from './components/PokemonCard'
import { useOutletContext } from 'react-router-dom';

function App() {
  const { pokemons, favorites, onToggle, currentPage, totalPages, onPageChange } = useOutletContext();

  return (
    <>
      <h1>Pokémon</h1>
      <section className='pokemon-page'>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onToggle={onToggle}
            isFavorite={!!favorites[pokemon.id]}
          />
        ))}
      </section>
      <div className='pages'>
        <button className='button' onClick={() => onPageChange(currentPage - 1)} >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button className='button' onClick={() => onPageChange(currentPage + 1)} >
          Next
        </button>
      </div >
    </>
  )
}

export default App
