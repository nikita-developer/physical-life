import Page, { defaultPage } from '@/interfaces/Page'
import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

export const useRickAndMortyStore = defineStore('rickandmorty', () => {
  const characters = ref<Page>(defaultPage())
  const filter_character = ref<Page>(defaultPage())
  const locations = ref<Page>(defaultPage())

  const is_load_get_characters = shallowRef<boolean>(false)
  const is_load_filter_character = shallowRef<boolean>(false)

  const character_name = shallowRef<string>('')
  let page: number = 1

  const filterCharacter = async (is_filter: boolean = false): Promise<void> => {
    is_load_filter_character.value = true
    try {
      if (is_filter) page = 1
      const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${character_name.value}&page=${page}`)
      filter_character.value = await res.json()
      page++
      is_filter ? characters.value.results = filter_character.value.results : characters.value.results = [...characters.value.results, ...filter_character.value.results]
      is_load_filter_character.value = false
    } catch (e) {
      console.log(e)
    } finally {
      is_load_filter_character.value = false
    }
  }

  const getLocations = async (): Promise<void> => {
    try {
      const res = await fetch('https://rickandmortyapi.com/api/location')
      locations.value = await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    filterCharacter,
    getLocations,
    characters,
    filter_character,
    locations,
    is_load_get_characters,
    character_name,
  }
})
