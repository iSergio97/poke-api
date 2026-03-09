<template>
  <nav class="bg-red-400 border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="@/assets/logo.svg" class="h-8" alt="Poke-API Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap">Poke-Api</span>
      </RouterLink>
      <div class="flex md:order-2">
        <button
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Buscar Pokemon</span>
        </button>
        <div class="relative hidden md:block">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <PokemonSVGComponent />
            <span class="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            v-model="search"
            id="search-navbar"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar Pokemon"
          />
          <div v-if="filteredPokemons.length" class="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto">
            <div v-for="pokemon in filteredPokemons" :key="pokemon.name" class="p-2 hover:bg-gray-100 cursor-pointer" @click="selectPokemon(pokemon)">
              <p class="capitalize font-bold">{{ pokemon.name }}</p>
            </div>
          </div>
        </div>
        <button
          data-collapse-toggle="navbar-search"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-search"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-search"
      >
        <div class="relative mt-3 md:hidden">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <div class="flex">
            <span
              class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            >
              <PokemonSVGComponent />
            </span>
            <input
              type="text"
              v-model="search"
              id="search-navbar-mobile"
              class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar Pokemon"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PokemonSVGComponent from './PokemonSVGComponent.vue';
import { searchStore } from '@/stores/search.store';
import type { Pokemon } from '@/interface/pokemon.interface';
import { computed } from 'vue';
import debounce from 'lodash/debounce';
import { useRouter } from 'vue-router';
import { usePokemonList } from '@/composables/usePokemonList';
// import router from '@/router';

const { replaceSearch } = searchStore();
const { list } = await usePokemonList();
const router = useRouter();

const search = ref('');

const filteredPokemons = computed(() => {
  if (!search.value) return [];
  return list.value.filter((p: Pokemon) => p.name.toLowerCase().startsWith(search.value.toLowerCase())).slice(0, 10);
});

const selectPokemon = (pokemon: Pokemon) => {
  search.value = '';
  router.push('/info/' + pokemon.name);
};

// onMounted(async () => {
//   if (list.value.length === 0) {
//     const list = await getListado();
//     replaceList(list || []);
//   }
// });

const debouncedReplace = debounce((value: string) => {
  replaceSearch(value);
}, 300);

watch(search, (newSearch: string) => {
  debouncedReplace(newSearch);
});


</script>
