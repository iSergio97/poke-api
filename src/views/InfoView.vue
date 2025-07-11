<template>
  <LoadingComponent v-if="loading" />
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
          <span>{{ ability.ability.root }}</span>
          <TooltipComponent
            :text="ability.ability.root?.name ?? 'No ability name available.'"
            :content="
              ability.ability.root?.effect_entries[0]?.effect || 'No effect description available.'
            "
          />
        </li>
      </ul>
      <div class="text-2xl text-bold">Stats</div>
      <ul class="list-none flex flex-col gap-2">
        <li v-for="(stat, index) in pokemon?.stats" :key="index" class="capitalize">
          <span>{{ stat.stat.name }}</span>
          <progress :value="stat.base_stat" max="255" />
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
import LoadingComponent from '@/components/LoadingComponent.vue';
import TooltipComponent from '@/components/TooltipComponent.vue';
import TypeComponent from '@/components/TypeComponent.vue';
import usePokemonList from '@/composables/usePokemonList';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const loading: Ref<boolean> = ref(true);
const { pokemon, getPokemonById, setPokemon } = await usePokemonList(false);

onMounted(async () => {
  if (pokemon.value === undefined) {
    const pokemonData = await getPokemonById(+route.params['id']);
    setPokemon(pokemonData);
    console.log('Pokemon fetched on mount:', pokemonData);
    console.log('Pokemon set in store:', pokemon.value);
  }
  loading.value = false;
});
</script>

<style scoped></style>
