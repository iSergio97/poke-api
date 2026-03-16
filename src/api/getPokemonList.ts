import type { Pokemon } from "@/interface/pokemon.interface";
import type { SearchPokemon } from "@/interface/search_pokemon.interface";
import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const getListadoPokemon = async (search: SearchPokemon[]): Promise<Pokemon[]> => {
  const pokePromises = search.map(async (searchPokemon: SearchPokemon) => {
    const response = await axios.get(searchPokemon.url);
    return response.data;
  });
  return await Promise.all(pokePromises);
};

export const getPokemonPage = async (page: number): Promise<Pokemon[]> => {
  const offset = page * 20;
  const limit = (page + 1) * 20;
  const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  const searchList: SearchPokemon[] = response.data.results;
  return await getListadoPokemon(searchList);
};
