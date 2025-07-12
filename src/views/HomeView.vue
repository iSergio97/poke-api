<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError" class="text-center text-red-500">Error loading Pokémon data</div>
  <div v-else>
    <div
      class="gap-4 mt-12 w-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6"
    >
      <CardComponent
        v-for="pokemon in searchPokemon"
        :key="pokemon.name"
        class="hover:cursor-pointer hover:bg-gray-200"
        :pokemon
        @click="replacePokemon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getListadoPokemon } from '@/api/getPokemonList';
import CardComponent from '@/components/CardComponent.vue';
import type { Pokemon } from '@/interface/pokemon.interface';
import { pokemonList } from '@/json/poke_api';
import router from '@/router';
import { useQuery } from '@tanstack/vue-query';

const replacePokemon = (pokemon: Pokemon) => {
  router.push(`/${pokemon.id}`);
};

const {
  data: searchPokemon,
  isError,
  isLoading,
} = useQuery({
  queryKey: ['pokemonList'],
  queryFn: async () => await Promise.all(await getListadoPokemon(pokemonList.results))
});
</script>
