<template>
  <div class="space-y-3">
    <h3 class="text-xl font-semibold mb-2">Stats</h3>

    <div v-for="(stat, index) in stats" :key="stat.stat.name" class="flex items-center gap-4">
      <!-- Stat name -->
      <span class="w-28 text-sm font-medium text-gray-700">
        {{ formatStatName(stat.stat.name) }}
      </span>

      <!-- Progress bar container -->
      <div class="flex-1 h-3 bg-gray-200 rounded overflow-hidden relative">
        <div
          class="h-full absolute left-0 top-0 transition-all duration-700 ease-out"
          :class="getStatColor(stat.stat.name)"
          :style="{ width: animatedWidths[index] + '%' }"
        ></div>
      </div>

      <!-- Stat value -->
      <span class="w-8 text-sm text-right font-semibold text-gray-800">
        {{ stat.base_stat }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Stat } from '@/interface/stat.interface';
import { ref, onMounted } from 'vue';

interface Props {
  stats: Stat[];
}

const { stats } = defineProps<Props>();

// Barra animada: starts at 0%, animates to real stat
const animatedWidths = ref<number[]>([]);

onMounted(() => {
  // Iniciar todas las barras en 0%
  animatedWidths.value = stats.map(() => 0);

  // Activar animación al render
  setTimeout(() => {
    animatedWidths.value = stats.map((s) => Math.round((s.base_stat / 255) * 100));
  }, 100);
});

const formatStatName = (name: string) =>
  name.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

const getStatColor = (name: string) => {
  switch (name) {
    case 'hp':
      return 'bg-red-500';
    case 'attack':
      return 'bg-orange-500';
    case 'defense':
      return 'bg-yellow-500';
    case 'special-attack':
      return 'bg-purple-500';
    case 'special-defense':
      return 'bg-indigo-500';
    case 'speed':
      return 'bg-green-500';
    default:
      return 'bg-blue-500';
  }
};
</script>
