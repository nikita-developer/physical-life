import { numberArray } from '@/composables'
import Character, { defaultCharacter } from '@/interfaces/Character'
import Page, { defaultPage } from '@/interfaces/Page'
import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

export const useRickAndMortyStore = defineStore('rickandmorty', () => {
  const characters = ref<Character[]>([defaultCharacter()])
  const filter_character = ref<Page>(defaultPage())
  const locations = ref<Page>(defaultPage())

  const is_load_get_characters = shallowRef<boolean>(false)
  const is_load_filter_character = shallowRef<boolean>(false)

  const getCharacters = async (count_characters: number[] = numberArray()): Promise<void> => {
    is_load_get_characters.value = true
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${count_characters}/`)
      characters.value = await res.json()
      is_load_get_characters.value = false
    } catch (e) {
      console.log(e)
    } finally {
      is_load_get_characters.value = false
    }
  }

  const filterCharacter = async (name: string): Promise<void> => {
    is_load_filter_character.value = true
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
      filter_character.value = await res.json()
      is_load_filter_character.value = false
    } catch (e) {
      console.log(e)
    } finally {
      is_load_filter_character.value = false
    }
  }

  const getLoacations = async (): Promise<void> => {
    try {
      const res = await fetch('https://rickandmortyapi.com/api/location')
      locations.value = await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getCharacters,
    filterCharacter,
    getLoacations,
    characters,
    filter_character,
    locations,
    is_load_get_characters,
  }
})
