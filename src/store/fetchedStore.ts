import { makeObservable, observable, action, autorun } from 'mobx'
import { fromPromise } from 'mobx-utils'
import { fetchBrands, fetchCustomBrand, fetchCustomSearch, fetchIDs, fetchItems, fetchPrice } from '../api/fetch'
import { ValantisItem } from '../types'

export class FetchedStoreClass {
  loading: boolean = true
  ids: string[] = []
  items: ValantisItem[] = []
  brands: string[] = []

  constructor() {
    makeObservable(this, {
      loading: observable,
      setLoading: action,
      fullFetch: action,
      ids: observable,
      setIDs: action,
      getCustomBrand: action,
      items: observable,
      setItems: action,
      brands: observable,
      setBrands: action
    })
    autorun(() => this.fullFetch(0))
    autorun(() => this.getBrands())
  }

  setLoading: (value: boolean) => void = (value) => (this.loading = value)

  getBrands: () => void = () => {
    fetchBrands().then((data) => this.setBrands(data))
  }

  getCustomBrand: (brand: string) => void = async (brand) => {
    this.setLoading(true)
    await fromPromise(fetchCustomBrand(brand))
      .then((ids) => [...new Set(ids)].filter((id) => !this.ids.includes(id)))
      .then((ids) => {
        this.setIDs(ids)
        return fetchItems(ids)
      })
      .then((items) => this.setItems(items))
      .then(() => this.setLoading(false))
  }

  getCustomSearch: (search: string) => void = async (search) => {
    this.setLoading(true)
    await fromPromise(fetchCustomSearch(search))
      .then((ids) => [...new Set(ids)].filter((id) => !this.ids.includes(id)))
      .then(async (ids) => {
        this.setIDs(ids)
        // in case ids.length is over 100
        const length = Math.floor(ids.length / 100)
        for (let i = 0; i < length; i++) {
          const array = ids.slice(100 * i, 100 * (i + 1))
          await fromPromise(fetchItems(array))
            .then((items: ValantisItem[]) => this.setItems(items))
            .then(() => i === 0 && this.setLoading(false))
        }
      })
      .then(() => this.loading && this.setLoading(false))
  }

  getCustomPrice: (price: number) => void = async (price) => {
    await fromPromise(fetchPrice(price))
  }

  async fullFetch(offset: number) {
    await fromPromise(fetchIDs(offset))
      .then((ids: string[]) => {
        if (Array.isArray(ids)) {
          this.setIDs(ids)
          return ids
        } else {
          throw new Error('No DB ids fetched')
        }
      })
      .then((ids) => ids && fetchItems(ids.slice(0, 100)))
      .then((items) => {
        if (Array.isArray(items)) {
          this.setItems(items)
          this.setLoading(false)
        } else {
          throw new Error('No store items fetched')
        }
      })
  }

  getIDs: (offset: number) => void = async (offset) => await fetchIDs(offset)

  setIDs: (data: string[]) => void = (data) => (this.ids = [...new Set([...this.ids, ...data])])

  setItems: (data: ValantisItem[]) => void = (data) => (this.items = [...this.items, ...data])

  setBrands: (data: string[]) => void = (data) => (this.brands = data)
}

export const fetchedStore = new FetchedStoreClass()
