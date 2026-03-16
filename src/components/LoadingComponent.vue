<template>
  <div class="flex justify-center items-center min-h-[50vh]">
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-20 h-20 animate-spin"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Red top half -->
        <circle cx="50" cy="50" r="45" fill="#FF0000" />
        <!-- White bottom half -->
        <circle cx="50" cy="50" r="45" fill="#FFFFFF" clip-path="url(#bottom-half)" />
        <!-- Black center line -->
        <rect x="5" y="47" width="90" height="6" fill="#000000" />
        <!-- Black circle in center -->
        <circle cx="50" cy="50" r="10" fill="#000000" />
        <!-- White inner circle -->
        <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
        <defs>
          <clipPath id="bottom-half">
            <rect x="0" y="50" width="100" height="50" />
          </clipPath>
        </defs>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
