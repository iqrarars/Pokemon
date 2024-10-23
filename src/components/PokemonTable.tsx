import { useEffect, useState } from "react";
import axios from "axios";
import {
  CollapseButton,
  PokemonTableContainer,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "../styles/PokemonTableStyles";

import PokemonModal from "./PokemonModal";
import { Pokemon } from "../types";
const PokemonTable = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [showExtraColumns, setShowExtraColumns] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showPokemonStats, setShowPokemonStats] = useState(false);

  const toggleColumns = () => {
    setShowExtraColumns((prev) => !prev);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleRowClick = (pokemon: Pokemon) => {
    if (selectedPokemon?.id === pokemon.id) {
      setSelectedPokemon(null);
      return;
    }
    setSelectedPokemon(pokemon);
    setShowPokemonStats(true);
  };

  const handleKeyChange = (event: React.KeyboardEvent) => {
    if (!selectedPokemon) return;

    const currentIndex = pokemonList.findIndex(
      (pokemon) => pokemon.id === selectedPokemon.id
    );
    if (event.key === "ArrowUp" && currentIndex > 0) {
      setSelectedPokemon(pokemonList[currentIndex - 1]);
    } else if (
      event.key === "ArrowDown" &&
      currentIndex < pokemonList.length - 1
    ) {
      setSelectedPokemon(pokemonList[currentIndex + 1]);
    }
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=200"
        );
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon: { url: string }) => {
            const res = await axios.get(pokemon.url);
            const sortedData: Pokemon = {
              id: res.data.id,
              name: capitalizeFirstLetter(res.data.name),
              height: res.data.height,
              weight: res.data.weight,
              types: res.data.types.map((type: any) =>
                capitalizeFirstLetter(type.type.name)
              ),
              picture: res.data.sprites.front_default,
              hp: res.data.stats[0].base_stat,
              attack: res.data.stats[1].base_stat,
              defense: res.data.stats[2].base_stat,
            };
            return sortedData;
          })
        );
        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <>
      <CollapseButton onClick={toggleColumns}>
        {showExtraColumns ? "Collapse table" : "Expand table"}
      </CollapseButton>
      <PokemonTableContainer onKeyDown={handleKeyChange} tabIndex={0}>
        <TableHeader>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            {showExtraColumns && (
              <>
                <TableHeaderCell>Weight</TableHeaderCell>
                <TableHeaderCell>Height</TableHeaderCell>
                <TableHeaderCell>Types</TableHeaderCell>
                <TableHeaderCell>Picture</TableHeaderCell>
              </>
            )}
          </tr>
        </TableHeader>

        <tbody>
          {pokemonList.map((pokemon) => (
            <TableRow
              key={pokemon.id}
              selected={selectedPokemon?.id === pokemon.id}
              onClick={() => handleRowClick(pokemon)}
            >
              <TableCell>{pokemon.id}</TableCell>
              <TableCell>{pokemon.name}</TableCell>
              {showExtraColumns && (
                <>
                  <TableCell>{pokemon.weight}</TableCell>
                  <TableCell>{pokemon.height}</TableCell>
                  <TableCell>{pokemon.types.join(", ")}</TableCell>
                  <TableCell>
                    <img src={pokemon.picture} alt={pokemon.name} width={70} />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </tbody>
      </PokemonTableContainer>
      {showPokemonStats && selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}
    </>
  );
};
export default PokemonTable;
