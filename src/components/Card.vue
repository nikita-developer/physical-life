<script setup lang="ts">
  import Character, { defaultCharacter } from '@/interfaces/Character'

  const { character = defaultCharacter() } = defineProps<{
    character: Character;
  }>()

</script>

<template>
  <v-card class="card">
    <template #loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      />
    </template>

    <v-img cover height="250" :src="character.image" />

    <v-card-item>
      <v-card-title>{{ character?.name }}</v-card-title>
    </v-card-item>
  </v-card>
</template>

<style scoped lang="scss">
@import "@/components/styles/card.scss";
</style>
