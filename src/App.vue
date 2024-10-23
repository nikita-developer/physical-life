<template>
  <div v-if="store.is_load_filter_character || store.is_load_filter_character_location || store.is_load_get_locations" class="load" />
  <router-view />
</template>

<script lang="ts" setup>
  import { useRickAndMortyStore } from '@/stores/rickandmorty'
  const store = useRickAndMortyStore()
</script>
