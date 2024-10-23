<script setup lang="ts">
  import { useRickAndMortyStore } from '@/stores/rickandmorty'
  const store = useRickAndMortyStore()

  const filter = () => {
    store.filterCharacter(true)
    store.location_item.name = 'Не выбрано'
  }

  onMounted(() => store.getLocations())
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <v-text-field
          v-model="store.character_name"
          append-inner-icon="mdi-magnify"
          density="compact"
          hide-details
          label="Поиск по имени"
          :loading="store.is_load_filter_character"
          single-line
          variant="solo"
          @click:append-inner="filter"
          @keydown.enter="filter"
        />
        <v-select
          v-model="store.location_item"
          density="compact"
          hide-details
          item-title="name"
          item-value="name"
          :items="store.all_locations"
          label="Поиск по локациям"
          return-object
          variant="solo"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
@import "./styles/header.scss";
</style>
