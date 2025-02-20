import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const PokemonsPerPage = 20;

  const handleAddFavorite = (pokemonId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [pokemonId]: !prevFavorites[pokemonId],
    }));
  };

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
            image: pokemonData.sprites.front_shiny || pokemonData.sprites.front_default,
            type: pokemonData.types[0].type.name,
            stats: {
              hp: pokemonData.stats[0].base_stat,
              attack: pokemonData.stats[1].base_stat,
              defense: pokemonData.stats[2].base_stat,
              specialAttack: pokemonData.stats[3].base_stat,
            },
          };
        })
      );
      setPokemons(allPokemons);
      setTotalPages(Math.ceil(data.count / PokemonsPerPage));
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const contextValue = {
    pokemons,
    favorites,
    onToggle: handleAddFavorite,
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
  };


  return (
    <>
      <Navbar />
      <main>
        <Outlet context={contextValue} />
      </main>
    </>
  )
}

export default Layout
