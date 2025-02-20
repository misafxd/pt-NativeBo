import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  const PokemonsPerPage = 20;

  const fetchPokemonById = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonData = await response.json();
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
    } catch (error) {
      console.error('Error loading Pokémon:', error);
      return null;
    }
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites);

      const favoriteIds = Object.keys(parsedFavorites).filter((id) => parsedFavorites[id]);

      const loadFavoritePokemons = async () => {
        const favoritePokemonsData = await Promise.all(
          favoriteIds.map((id) => fetchPokemonById(id))
        );

        const validFavoritePokemons = favoritePokemonsData.filter((pokemon) => pokemon !== null);

        setFavoritePokemons(validFavoritePokemons);
      };

      loadFavoritePokemons();
    }
  }, []);

  const handleAddFavorite = (pokemonId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = {
        ...prevFavorites,
        [pokemonId]: !prevFavorites[pokemonId],
      };

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      if (!prevFavorites[pokemonId]) {
        fetchPokemonById(pokemonId).then((newFavoritePokemon) => {
          if (newFavoritePokemon) {
            setFavoritePokemons((prevFavoritePokemons) => [...prevFavoritePokemons, newFavoritePokemon]);
          }
        });
      } else {
        setFavoritePokemons((prevFavoritePokemons) =>
          prevFavoritePokemons.filter((pokemon) => pokemon.id !== parseInt(pokemonId))
        );
      }

      return updatedFavorites;
    });
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
    favoritePokemons,
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
