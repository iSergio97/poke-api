<template>
  <h3 class="text-xl font-semibold mb-2 flex justify-center pb-4">Abilities</h3>
  <div class="flex justify-center gap-4">
    <div class="grid gap-4 items-stretch">
      <div
        v-for="ability in abilities"
        :key="ability.ability.name"
        class="flex flex-col justify-between p-4 rounded-xl shadow-sm bg-white border border-gray-200"
      >
        <div class="flex items-center justify-between pb-2">
          <h2 class="text-lg font-semibold capitalize text-gray-800">
            {{ ability.ability.name }}
          </h2>
          <span
            v-if="ability.is_hidden"
            class="text-sm text-orange-600 bg-orange-100 px-2 py-0.5 rounded"
          >
            Habilidad oculta
          </span>
        </div>
        <p class="mt-2 text-sm text-gray-600 mt-auto">
          {{
            getEnglishEffect(ability.ability.root?.effect_entries) ||
            'No effect description available.'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ability } from '@/interface/ability.interface';
import type { EffectEntry } from '@/interface/ability2.interface';

interface Props {
  abilities: Ability[];
}

const { abilities } = defineProps<Props>();

const getEnglishEffect = (effectEntries: EffectEntry[] | undefined): string | null => {
  if (!effectEntries || effectEntries.length === 0) return null;
  const englishEntry = effectEntries.find((entry) => entry.language.name === 'en');
  return englishEntry ? englishEntry.effect : null;
};
</script>

<style scoped></style>
