<template>
  <div class="w-[350px] bg-gray-200 rounded-full dark:bg-gray-700 h-8 overflow-hidden">
    <div
      class="bg-blue-600 h-full transition-all duration-300 ease-out flex items-center justify-center text-white text-sm font-bold"
      :style="{ width: `${clampedWidth}%` }"
    >
      {{ width }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { width } = defineProps({
  width: {
    type: Number,
    default: 0,
  },
});

const clampedWidth = computed(() => {
  const scaled = (width / 255) * 100;
  return Math.min(100, Math.max(0, scaled));
});
</script>
