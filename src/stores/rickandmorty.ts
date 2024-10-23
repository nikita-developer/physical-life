import Character, { defaultCharacter } from '@/interfaces/Character'
import Location, { defaultLocation } from '@/interfaces/Location'
import Page, { defaultPage } from '@/interfaces/Page'
import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

export const useRickAndMortyStore = defineStore('rickandmorty', () => {
  const characters = ref<Page>(defaultPage())
  const filter_character = ref<Page>(defaultPage())
  const locations = ref<Page>(defaultPage())
  const all_locations = ref<Location[]>([defaultLocation()])

  const is_load_filter_character = shallowRef<boolean>(false)
  const is_load_filter_character_location = shallowRef<boolean>(false)
  const is_load_get_locations = shallowRef<boolean>(false)

  const character_name = shallowRef<string>('')
  const location_item = ref<Location>(defaultLocation())

  let location_characters: number[] = []
  watch(() => location_item.value.name, () => {
    if (location_item.value.name !== 'Не выбрано') {
      character_name.value = ''
      location_characters = location_item.value.residents.map((url: string) => parseInt(url.replace(/[^\d]/g, '')))
      if (!location_characters.length) {
        characters.value.results = []
        return
      }
      filterCharacterLocation()
    }
  })

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

  const filterCharacterLocation = async (): Promise<void> => {
    is_load_filter_character_location.value = true
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${location_characters}`)
      if (location_characters.length === 1) {
        characters.value.results = new Array(await res.json())
      } else {
        characters.value.results = await res.json()
      }
      is_load_filter_character_location.value = false
    } catch (e) {
      console.log(e)
    } finally {
      is_load_filter_character_location.value = false
    }
  }

  const getLocations = async (location_page: number = 1, last_page = 1): Promise<void> => {
    if (location_page > last_page) return
    is_load_get_locations.value = true
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/location/?page=${location_page}`)
      locations.value = await res.json()
      all_locations.value = [...all_locations.value, ...locations.value.results]
      await getLocations(++location_page, locations.value.info.pages)
      is_load_get_locations.value = false
    } catch (e) {
      console.log(e)
    } finally {
      is_load_get_locations.value = false
    }
  }

  return {
    filterCharacter,
    getLocations,
    filterCharacterLocation,
    characters,
    filter_character,
    is_load_filter_character,
    is_load_filter_character_location,
    locations,
    all_locations,
    character_name,
    location_item,
    is_load_get_locations,
  }
})
