<template>
  <LoadingComponent v-if="isLoading || !pokemon" />
  <div v-else-if="error" class="text-center text-red-500">
    Error loading Pokémon data: {{ error.message }}
  </div>
  <div v-else class="grid gap-4">
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
      <div class="sm:col-span-1">
        <div class="flex capitalize text-3xl text-bold justify-center pb-4">
          {{ pokemon?.name }}
        </div>
        <div class="flex justify-center">
          <PokemonCarouselComponent :sprites="pokemon?.sprites" />
        </div>
        <div class="grid justify-center pt-4">
          <div class="flex justify-between gap-4 pt-3">
            <TypeComponent custom-text-size="text-2xl" :types="pokemon!.types" />
          </div>
        </div>
      </div>
      <div class="justify-center">
        <AbilityComponent :abilities="pokemon?.abilities" />
        <div class="grid gap-4 items-stretch pt-12">
          <StatsComponent :stats="pokemon?.stats" />
        </div>
      </div>
    </div>
    <div class="grid items-center pt-4">
      <MovesComponent :moves="pokemon?.moves" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPokemonById } from '@/api/getPokemonById';
import AbilityComponent from '@/components/AbilityComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import MovesComponent from '@/components/MovesComponent.vue';
import PokemonCarouselComponent from '@/components/PokemonCarouselComponent.vue';
import StatsComponent from '@/components/StatsComponent.vue';
import TypeComponent from '@/components/TypeComponent.vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';

const route = useRoute();

const id = +route.params['id'];

const {
  data: pokemon,
  isLoading,
  error,
} = useQuery({
  queryKey: ['pokemon', route.params['id']],
  queryFn: async () => await getPokemonById(id),
  enabled: !!id,
});
</script>
