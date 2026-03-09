// import { LIST } from '@/api/BASE_URL';
import type { Pokemon } from '@/interface/pokemon.interface';
import type { Search } from '@/interface/search.interface';
import type { SearchPokemon } from '@/interface/search_pokemon.interface';
import { pokemonListStore } from '@/stores/pokemonList.store';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

import { pokemonList } from '@/json/poke_api';
import { useQuery } from '@tanstack/vue-query';

const getInfoPokemon = (search: SearchPokemon[]) => {
  return search.map((searchPokemon) =>
    axios
      .get<Pokemon>(searchPokemon.url)
      .then(({ data }) => data)
  );
};

const getListado = async () => {
  try {
    // const { data } = await axios.get<Search>(LIST);
    const data: Search = pokemonList;
    const promiseList: Promise<Pokemon>[] = getInfoPokemon(data.results);
    return ref(await Promise.all(promiseList));
  } catch (ex) {
    console.error(ex);
    return [];
  }
};

export const usePokemonList = async () => {
  const store = pokemonListStore();
  const { list, pokemon } = storeToRefs(store);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: getListado
  });

  watch(
    data,
    (newList) => {
      if (newList) {
        store.replaceList(newList as Pokemon[]);
      }
    },
    { immediate: true },
  );

  return {
    list,
    isLoading,
    isError,
    pokemon,
    setPokemon: store.setPokemon,
  };
};
