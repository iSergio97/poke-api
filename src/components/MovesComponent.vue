<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Effect</th>
          <th scope="col" class="px-6 py-3">Power</th>
          <th scope="col" class="px-6 py-3">Accuracy</th>
          <th scope="col" class="px-6 py-3">PP</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="odd:bg-white  even:bg-gray-50 border-b border-gray-200"
          v-for="({ move }) in moves"
          :key="move.url"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
          >
            {{ move.name }}
          </th>
          <td class="px-6 py-4">{{ getMoveText(move.moveRoot.flavor_text_entries) }}</td>
          <td class="px-6 py-4">{{ getEffectEntry(move.moveRoot.effect_entries) }}</td>
          <td class="px-6 py-4">{{ move.moveRoot.power }}</td>
          <td class="px-6 py-4">{{ move.moveRoot.accuracy }}</td>
          <td class="px-6 py-4">{{ move.moveRoot.pp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Mfe } from '@/interface/mfe.interface';
import type { EffectEntry, FlavorTextEntry } from '@/interface/move.interface';

interface Props {
  moves: Mfe[];
}

const { moves } = defineProps<Props>();

const getMoveText = (flavorTexts: FlavorTextEntry[]) => {
  const text = flavorTexts.find((text) => text.language.name === 'en');
  return text ? text.flavor_text : flavorTexts[0].flavor_text;
};

const getEffectEntry = (effectEntries: EffectEntry[]) => {
  if (!effectEntries || effectEntries.length === 0) {
    return '';
  }
  const entry = effectEntries.find((entry) => entry.language.name === 'en');
  return entry ? entry.effect : effectEntries[0].effect;
};
</script>

<style scoped></style>
