<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError" class="text-center text-red-500">Error loading Pokémon data</div>

<div
  v-else
  class="gap-4 mt-12 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6"
>
  <CardComponent
    v-for="pokemon in allPokemon"
    :key="pokemon.name"
    :pokemon="pokemon"
    class="hover:cursor-pointer hover:bg-gray-200"
    @click="replacePokemon"
  />

  <div ref="sentinel" class="col-span-full h-20"></div>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { getPokemonPage } from '@/api/getPokemonList';
import CardComponent from '@/components/CardComponent.vue';
import type { Pokemon } from '@/interface/pokemon.interface';
import router from '@/router';
import { useIntersectionObserver } from '@vueuse/core';

const replacePokemon = (pokemon: Pokemon) => {
  router.push(`/info/${pokemon.name}`);
};

const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
  useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: ({ pageParam = 0 }) => getPokemonPage(pageParam as number),
    getNextPageParam: (_, allPages) => {
      const totalFetched = allPages.length * 20;
      return totalFetched < 1302 ? totalFetched : undefined;
    },
    initialPageParam: 0,
  });

const allPokemon = computed(() => data.value?.pages.flat() ?? []);

const sentinel = ref(null);

useIntersectionObserver(
  sentinel,
  ([entry], observerElement) => {
    if (!entry.isIntersecting) return

    if (hasNextPage.value && !isFetchingNextPage.value) {
      fetchNextPage()
    }
  },
  {
    threshold: 1,
  }
)
</script>
