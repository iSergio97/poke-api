// import { LIST } from '@/api/BASE_URL';
import type { Pokemon } from '@/interface/pokemon.interface';
import type { Search } from '@/interface/search.interface';
import type { SearchPokemon } from '@/interface/search_pokemon.interface';
import { pokemonListStore } from '@/stores/pokemonList.store';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

import { pokemonList } from '@/json/poke_api';
import { BASE_URL } from '@/api/BASE_URL';

const getInfoPokemon = async (search: SearchPokemon[]) => {
  const pokeList: Promise<Pokemon>[] = [];

  search.forEach(async (searchPokemon: SearchPokemon) => {
    const pokePromise: Promise<Pokemon> = axios
      .get<Promise<Pokemon>>(searchPokemon.url)
      .then(({ data }) => data);
    pokeList.push(pokePromise);
  });

  return pokeList;
};

const getPokemonById = async (id: number) => {
  const { data: pokemon } = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);

  return pokemon;
};

const getListado = async () => {
  try {
    // const { data } = await axios.get<Search>(LIST);
    const data: Search = pokemonList;
    const promiseList: Promise<Pokemon>[] = await getInfoPokemon(data.results);
    return ref(await Promise.all(promiseList));
  } catch (ex) {
    console.error(ex);
    return [];
  }
};

const usePokemonList = async () => {
  const store = pokemonListStore();
  const { list, pokemon } = storeToRefs(store);
  const pokemonListQuery = await getListado();

  watch(
    pokemonListQuery,
    (newList) => {
      if (newList) {
        store.replaceList(newList as Pokemon[]);
      }
    },
    { immediate: true },
  );

  return {
    list,
    pokemon,
    setPokemon: store.setPokemon,
    getPokemonById,
  };
};

export default usePokemonList;
