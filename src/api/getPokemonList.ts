import type { Pokemon } from "@/interface/pokemon.interface";
import type { SearchPokemon } from "@/interface/search_pokemon.interface";
import axios from "axios";

export const getListadoPokemon = async (search: SearchPokemon[]) => {
  const pokeList: Promise<Pokemon>[] = [];

  search.forEach(async (searchPokemon: SearchPokemon) => {
    const pokePromise: Promise<Pokemon> = axios
      .get<Promise<Pokemon>>(searchPokemon.url)
      .then(({ data }) => data);
    pokeList.push(pokePromise);
  });

  return pokeList;
};
