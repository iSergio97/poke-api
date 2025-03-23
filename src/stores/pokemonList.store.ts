import type { Pokemon } from '@/interface/pokemon.interface';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';

export const pokemonListStore = defineStore('pokemonListStore', () => {
  const list: Ref<Pokemon[]> = ref([]);
  const pokemon: Ref<Pokemon | undefined> = ref(undefined);
  const replaceList = (newList: Pokemon[]) => {
    list.value = newList;
  };

  const setPokemon = (poke: Pokemon | undefined) => {
    pokemon.value = poke;
  };

  return {
    list: computed(() => list.value),
    pokemon: computed(() => pokemon.value),
    replaceList,
    setPokemon,
  };
});
