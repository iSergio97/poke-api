<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavbarComponent from './components/NavbarComponent.vue';
</script>

<template>
  <NavbarComponent />
  <div class="container p-4 mx-auto gap-4 mt-12 w-auto">
    <RouterView />
  </div>
</template>
