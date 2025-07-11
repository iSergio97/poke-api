<template>
  <div v-if="loading">Loading...</div>
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
import CardComponent from '@/components/CardComponent.vue';
import usePokemonList from '@/composables/usePokemonList';
import type { Pokemon } from '@/interface/pokemon.interface';
import router from '@/router';
import { onMounted, ref, type Ref } from 'vue';

const searchPokemon: Ref<Pokemon[]> = ref([]);

const poke: Ref<Pokemon | undefined> = ref(undefined);

const loading: Ref<boolean> = ref(false);

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
let setPokeFunction: Function | undefined;

const replacePokemon = (pokemon: Pokemon) => {
  if (setPokeFunction) {
    poke.value = pokemon;
    setPokeFunction(pokemon);
    router.push(`/${poke.value.id}`);
  }
};

onMounted(async () => {
  loading.value = true;
  const { list, pokemon, setPokemon } = await usePokemonList(true);
  searchPokemon.value = list.value;
  poke.value = pokemon.value;
  loading.value = false;
  setPokeFunction = setPokemon;
});
</script>
