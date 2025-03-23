<template>
  <div class="capitalize">Info {{ poke?.name }}</div>
</template>

<script setup lang="ts">
import usePokemonList from '@/composables/usePokemonList';
import type { Pokemon } from '@/interface/pokemon.interface';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const poke: Ref<Pokemon | undefined> = ref(undefined);

onMounted(async () => {
  const { pokemon, getPokemonById, setPokemon } = await usePokemonList();
  if (pokemon.value === undefined) {
    const pokemon = await getPokemonById(+route.params['id']);
    setPokemon(pokemon);
  }
  poke.value = pokemon.value;
});
</script>

<style scoped></style>
