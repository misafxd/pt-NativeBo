import './App.css'
import Navbar from './components/Navbar'
import PokemonCard from './components/PokemonCard'
import { useState, useEffect } from 'react';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const PokemonsPerPage = 20;

  const fetchPokemons = async (page) => {
    try {
      const offset = (page - 1) * PokemonsPerPage;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PokemonsPerPage}&offset=${offset}`);
      const data = await response.json();


      const allPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.front_shiny || data.sprites.front_default,
            type: pokemonData.types[0].type.name,
            stats: {
              hp: pokemonData.stats[0].base_stat,
              attack: pokemonData.stats[1].base_stat,
              defense: pokemonData.stats[2].base_stat,
              specialAttack: pokemonData.stats[3].base_stat,
            }
          }
        })
      )

      setPokemons(allPokemons);
      setTotalPages(Math.ceil(data.count / PokemonsPerPage));
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <h1>Pokemons</h1>
      <section className='pokemon-page'>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
      <div className='pages'>
        <button onClick={() => handlePageChange(currentPage - 1)} >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} >
          Next
        </button>
      </div >
    </>
  )
}

export default App
