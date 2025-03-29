<template>
  <div
    class="border border-gray-200 p-6 flex flex-col items-center shadow transition-transform duration-300 hover:scale-x-120 hover:scale-y-120"
    @click="emit('click', pokemon)"
  >
    <img
      :src="sprites.other['official-artwork'].front_default"
      :alt="name"
      class="object-scale-down"
    />
    <div>
      <span class="flex items-center text-xl sm:text-xs md:text-xs lg:text-xs xl:text-xs"
        >#{{ fillZeros(id) }}</span
      >
    </div>
    <div>
      <p class="capitalize font-bold text-4xl sm:text-3xl md:text-2xl lg:text-2xl xl:text-2xl">
        {{ name }}
      </p>
    </div>
    <div class="flex justify-between gap-2 pt-3">
      <TypeComponent :types="types" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '@/interface/pokemon.interface';
import TypeComponent from './TypeComponent.vue';
import { toRefs } from 'vue';

interface Props {
  pokemon: Pokemon;
}

const emit = defineEmits(['click']);

const { pokemon } = defineProps<Props>();

const { sprites, name, id, types } = toRefs(pokemon);

const fillZeros = (number: number): string => {
  return number.toString().padStart(4, '0');
};
</script>
