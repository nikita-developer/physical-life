<script lang="ts" setup>
  import Card from '@/components/Card.vue'
  import { checkPosition, throttle } from '@/composables'
  import { useRickAndMortyStore } from '@/stores/rickandmorty'

  const store = useRickAndMortyStore()

  onMounted(() => {
    store.filterCharacter()
    window.addEventListener('scroll', throttle(checkPosition, 250))
    window.addEventListener('resize', throttle(checkPosition, 250))
  })
</script>

<template>
  <div class="page">
    <div class="container">
      <TransitionGroup class="page__body" name="list" tag="div">
        <Card
          v-for="character in store.characters.results"
          :key="character.id"
          :character
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/pages/styles/page.scss";
</style>
