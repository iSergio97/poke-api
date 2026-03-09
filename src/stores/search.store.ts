import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';

export const searchStore = defineStore('searchStore', () => {
  const search: Ref<string> = ref('');
  const replaceSearch = (newSearch: string) => {
    search.value = newSearch;
  };

  return {
    search: computed(() => search.value),
    replaceSearch,
  };
});
