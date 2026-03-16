<template>
  <LoadingComponent v-if="isLoading" />
  <div v-else-if="error" class="text-center text-red-500">
    Error loading Pokémon data: {{ error.message }}
  </div>
  <div v-else class="grid gap-4">
    <div class="grid md:grid-cols-2 gap-4 w-full">
      <div>
        <div class="flex capitalize text-xl sm:text-2xl md:text-3xl font-bold justify-center pb-2 sm:pb-4">
          {{ pokemon!.name }}
        </div>
        <div class="flex justify-center">
          <PokemonCarouselComponent :sprites="pokemon!.sprites" :types="pokemon!.types" />
        </div>
      </div>

      <div class="flex flex-col items-stretch w-full place-items-start">
        <div class="pt-4 sm:pt-8 md:pt-12">
          <AbilityComponent :abilities="pokemon!.abilities" css-class="w-full" />
        </div>
        <div class="pt-4 sm:pt-8 md:pt-12">
          <StatsComponent :stats="pokemon!.stats" css-class="w-full" />
        </div>
      </div>
    </div>

    <div class="grid items-center pt-4">
      <MovesComponent :moves="pokemon!.moves" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPokemonByIdOrName } from '@/api/getPokemonByIdOrName';
import AbilityComponent from '@/components/AbilityComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import MovesComponent from '@/components/MovesComponent.vue';
import PokemonCarouselComponent from '@/components/PokemonCarouselComponent.vue';
import StatsComponent from '@/components/StatsComponent.vue';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pathParam = computed(() => route.params['param'] as string);

const {
  data: pokemon,
  isLoading,
  error,
  } = useQuery({
  queryKey: ['pokemonById', pathParam],
  queryFn: async () => await getPokemonByIdOrName(pathParam.value),
  enabled: !!pathParam.value,
});
</script>
