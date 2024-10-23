import { useRickAndMortyStore } from '@/stores/rickandmorty'

export const numberArray = (number: number = 20): number[] => [...Array(number)].map((_, i) => ++i)

const store = useRickAndMortyStore()

export const checkPosition = () => {
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight

  const scrolled = window.scrollY

  const threshold = height - screenHeight / 4
  const position = scrolled + screenHeight

  if (position >= threshold) store.filterCharacter()
}

export const throttle = (callee, timeout) => {
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
