<script setup lang="ts">
  import { useRickAndMortyStore } from '@/stores/rickandmorty'
  const store = useRickAndMortyStore()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <v-text-field
          append-inner-icon="mdi-magnify"
          density="compact"
          hide-details
          label="Search templates"
          :loading="store.is_load_get_characters"
          single-line
          variant="solo"
          @click:append-inner="store.getCharacters()"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
@import "./styles/header.scss";
</style>
