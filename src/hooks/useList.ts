import { fetchedStore, appStore } from '../store'
import { ValantisItem } from '../types'

export const useList = () => {
  const { brandFilter, searchFilter, sort } = appStore
  const { items } = fetchedStore

  const list = items
    .filter((item) => (brandFilter ? item.brand === brandFilter : item))
    .filter((item) => item.product.includes(searchFilter || ''))
    .sort((a: ValantisItem, b: ValantisItem): number => {
      switch (sort) {
        case 'asc':
          return a.price < b.price ? 1 : a.price > b.price ? -1 : 0

        case 'desc':
          return a.price < b.price ? -1 : a.price > b.price ? 1 : 0

        default:
          return 0
      }
    })

  return { list, items }
}
