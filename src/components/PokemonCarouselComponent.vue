<template>
  <div class="w-full max-w-sm mx-auto">
    <!-- Imagen principal grande -->
    <div
      class="relative aspect-square bg-gray-100 border rounded-xl flex items-center justify-center overflow-hidden"
    >
      <transition name="fade" mode="out-in">
        <img
          v-if="images.length"
          :key="currentIndex"
          :src="images[currentIndex]"
          alt="pokemon"
          class="object-contain w-full h-full p-4"
        />
      </transition>
    </div>

    <div class="text-center text-2xl font-bold mt-4">
      <h3>{{ imageName }}</h3>
    </div>

    <!-- Carrusel de miniaturas -->
    <div
      ref="thumbnailsContainer"
      class="flex gap-2 mt-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pt-8"
      style="scroll-behavior: smooth"
    >
      <div
        v-for="(img, idx) in images"
        :key="idx"
        :ref="(el) => (thumbnailRefs[idx] = el as HTMLElement)"
        class="flex-shrink-0 w-20 h-20 rounded-md border-2 cursor-pointer hover:border-black hover:bg-slate-200 transition-colors duration-200"
        :class="idx === currentIndex ? 'border-blue-600' : 'border-transparent'"
        @click="selectImage(idx)"
      >
        <img :src="img" alt="miniatura" class="object-contain w-full h-full rounded-md" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sprites } from '@/interface/sprites.interface';
import { ref, onMounted, nextTick, watch } from 'vue';

interface Props {
  sprites: Sprites;
}

const { sprites } = defineProps<Props>();

const currentIndex = ref(0);
const images = ref<string[]>([]);

const thumbnailsContainer = ref<HTMLElement | null>(null);
// Array de refs a miniaturas
const thumbnailRefs = ref<(HTMLElement | null)[]>([]);

const imageName = ref('Front Default');

const extractImages = () => {
  const imgs: (string | null | undefined)[] = [
    sprites.front_default,
    sprites.back_default,
    sprites.front_shiny,
    sprites.back_shiny,
    sprites.other?.['official-artwork']?.front_default,
    sprites.other?.home?.front_default,
    sprites.other?.dream_world?.front_default,
  ];
  images.value = Array.from(new Set(imgs.filter(Boolean) as string[]));
};

const imagesNames = [
  'Front Default',
  'Back Default',
  'Front Shiny',
  'Back Shiny',
  'Official Artwork Front',
  'Home Front',
  'Dream World Front',
];

onMounted(() => {
  extractImages();
});

const selectImage = (idx: number) => {
  currentIndex.value = idx;
  nextTick(() => {
    const el = thumbnailRefs.value[idx];
    if (el && thumbnailsContainer.value) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });
};

watch(currentIndex, (newIndex) => {
  if (images.value.length > 0) {
    imageName.value = imagesNames[newIndex] || 'Unknown Image';
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #f0f0f0;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #a0aec0;
  border-radius: 3px;
}
</style>
