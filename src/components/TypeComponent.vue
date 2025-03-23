<template>
  <div v-for="type in types" :key="type.slot">
    <div
      :class="`rounded p-2 text-2xl sm:text-xl md:text-xs lg:text-xs xl:text-xs font-bold capitalize ${type.type.name}`"
    >
      {{ type.type.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Types } from '@/interface/types.interface';

interface Props {
  types: Types[];
}

const { types } = defineProps<Props>();
</script>
