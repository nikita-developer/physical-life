<script lang="ts" setup>
  import Card from '@/components/Card.vue'
  import { numberArray } from '@/composables'
  import { useRickAndMortyStore } from '@/stores/rickandmorty'

  const store = useRickAndMortyStore()

  let card_length: number = 20

  const checkPosition = () => {
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight

    const scrolled = window.scrollY

    const threshold = height - screenHeight / 4
    const position = scrolled + screenHeight

    if (position >= threshold) {
      store.getCharacters(numberArray(card_length + 20))
      card_length = card_length + 20
    }
  }

  const throttle = (callee, timeout) => {
    let timer = null

    return (...args) => {
      if (timer) return

      timer = setTimeout(() => {
        callee(...args)

        clearTimeout(timer)
        timer = null
      }, timeout)
    }
  }

  onMounted(() => {
    store.getCharacters(numberArray(card_length))
    window.addEventListener('scroll', throttle(checkPosition, 250))
    window.addEventListener('resize', throttle(checkPosition, 250))
  })
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="page__body">
        <Card
          v-for="character in store.characters"
          :key="character.id"
          :character
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/pages/styles/page.scss";
</style>
