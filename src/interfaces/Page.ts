import Character from '@/interfaces/Character'
import Location from '@/interfaces/Location'

export default interface Page {
  info: {
    count?: number
    pages?: number
    next?: null | string
    prev?: null | string
  }
  results: Character[] | Location[]
}

export const defaultPage = (): Page => {
  return {
    info: {},
    results: [],
  }
}
