import { makeObservable, observable, action, reaction } from 'mobx'

import { fetchedStore } from '.'

export class AppStoreClass {
  cart: string[] = []
  page: number = 0
  lastPage: boolean = false
  brandFilter: string | null = null
  searchFilter: string | null = null
  sort: 'asc' | 'desc' | 'flat' = 'flat'

  constructor() {
    makeObservable(this, {
      cart: observable,
      addToCart: action,
      removeFromCart: action,
      page: observable,
      setPage: action,
      brandFilter: observable,
      setBrandFilter: action,
      searchFilter: observable,
      setSearchFilter: action,
      sort: observable,
      clearSearch: action,
      setSort: action
    })
  }

  addToCart: (id: string) => void = (id) => (this.cart = [...this.cart, id])

  removeFromCart: (id: string) => void = (id) => (this.cart = this.cart.filter((el) => el !== id))

  setPage: (id: number) => void = (id) => (this.page = Math.max(id, 0))

  setBrandFilter: (brand: string | null) => void = (brand) => {
    this.brandFilter = brand
    this.page = 0
  }

  setSearchFilter: (search: string | null) => void = (search) => (this.searchFilter = search)

  setSort: () => void = () => {
    switch (this.sort) {
      case 'asc':
        this.sort = 'desc'
        break

      case 'desc':
        this.sort = 'flat'
        break

      case 'flat':
        this.sort = 'asc'
        break

      default:
        break
    }
  }

  clearSearch: () => void = () => {
    this.brandFilter = null
    this.searchFilter = null
  }
}

export const appStore = new AppStoreClass()

reaction(
  () => {
    const { page, brandFilter, sort } = appStore
    const lastPage = !!page && (page + 2) * 50 > fetchedStore.items?.length && !brandFilter
    return { lastPage, sort }
  },
  ({ lastPage, sort }) => lastPage && sort === 'flat' && fetchedStore.fullFetch((appStore.page + 1) / 2)
)
