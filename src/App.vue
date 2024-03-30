<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <header>
      <nav class="flex justify-center mt-4 mb-6 pb-6 border-b border-slate-500">
        <RouterLink to="/" class="btn btn-primary mx-1">Home</RouterLink>
        <RouterLink class="btn btn-secondary mx-1" to="/trainer">Trainer</RouterLink>
        <RouterLink class="btn btn-accent mx-1" to="/about">About</RouterLink>
      </nav>
    </header>

    <RouterView class="container mx-auto " />
  </div>
</template>

<style></style>
