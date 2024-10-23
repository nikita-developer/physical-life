import { useRickAndMortyStore } from '@/stores/rickandmorty'

export const numberArray = (number: number = 20): number[] => [...Array(number)].map((_, i) => ++i)

const store = useRickAndMortyStore()

export const checkPosition = () => {
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight

  const scrolled = window.scrollY

  const threshold = height - screenHeight / 4
  const position = scrolled + screenHeight

  if (store.location_item.name === 'Не выбрано') {
    if (position >= threshold) store.filterCharacter()
  }
}

export const throttle = (callee: any, timeout: number) => {
  let timer: any

  return (...args: any) => {
    if (timer) return

    timer = setTimeout(() => {
      callee(...args)

      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}
