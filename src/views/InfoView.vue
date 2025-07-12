<template>
  <LoadingComponent v-if="isLoading || !pokemon" />
  <div v-else-if="error" class="text-center text-red-500">
    Error loading Pokémon data: {{ error.message }}
  </div>
  <div v-else class="columns-1">
    <div>
      <div class="flex capitalize text-3xl text-bold justify-center pb-4">{{ pokemon?.name }}</div>
      <div class="flex justify-center">
        <img
          :src="pokemon?.sprites.other.dream_world.front_default"
          alt="pokemon"
          class="w-1/4 h-1/4"
        />
      </div>
      <div class="grid justify-center pt-4">
        <div class="list-none flex justify-between gap-4 pt-3">
          <TypeComponent custom-text-size="text-2xl" :types="pokemon!.types" />
        </div>
      </div>
    </div>
    <div>
      <div class="text-2xl text-bold">Abilities</div>
      <ul class="list-none">
        <li v-for="(ability, index) in pokemon?.abilities" :key="index" class="capitalize">
          <TooltipComponent
            :text="ability.ability.root?.name ?? ability.ability.name"
            :content="
              getEnglishEffect(ability.ability.root?.effect_entries) ||
              'No effect description available.'
            "
          />
        </li>
      </ul>
      <div class="text-2xl text-bold">Stats</div>
      <ul class="list-none flex flex-col gap-2">
        <li v-for="(stat, index) in pokemon?.stats" :key="index" class="capitalize">
          <span class="flex text-xl p-4">{{ stat.stat.name }}</span>
          <ProgressBarComponent :width="stat.base_stat" />
        </li>
      </ul>
      <div class="text-2xl text-bold">Moves</div>
      <ul class="list-none" v-if="false">
        <li v-for="(move, index) in pokemon?.moves" :key="index" class="capitalize">
          {{ move.move.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPokemonById } from '@/api/getPokemonById';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ProgressBarComponent from '@/components/ProgressBarComponent.vue';
import TooltipComponent from '@/components/TooltipComponent.vue';
import TypeComponent from '@/components/TypeComponent.vue';
import type { EffectEntry } from '@/interface/ability2.interface';
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

const getEnglishEffect = (effectEntries: EffectEntry[] | undefined): string | null => {
  if (!effectEntries || effectEntries.length === 0) return null;
  const englishEntry = effectEntries.find((entry) => entry.language.name === 'en');
  return englishEntry ? englishEntry.effect : null;
};
</script>

<style scoped></style>
