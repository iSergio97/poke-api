<template>
  <div class="tooltip-container" @mouseenter="show = true" @mouseleave="show = false">
    <span> {{  text }}</span>
    <transition name="fade">
      <div v-if="show" class="tooltip" :class="position">
        {{ content }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  text: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}>();

const show = ref(false);
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 13px;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0.9;
}

.tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 6px;
}

.tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
}

.tooltip.left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 6px;
}

.tooltip.right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 6px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
