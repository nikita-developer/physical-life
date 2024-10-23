export default interface Location {
  id?: number
  name?: string
  type?: string
  dimension?: unknown | string
  residents: string[]
  url?: string
  created?: string
}

export const defaultLocation = (): Location => {
  return {
    name: 'Не выбрано',
    residents: [],
  }
}
