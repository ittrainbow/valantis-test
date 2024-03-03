import axios from 'axios'
import axiosRetry from 'axios-retry'

import { ValantisItem } from '../types'
import { baseURL, params, retryParams } from '.'

export const fetchIDs = async (start: number, limit: number = 101): Promise<string[]> => {
  const data = {
    action: 'get_ids',
    params: { offset: start * 100, limit }
  }

  // limit set to 101 to make unique ids amount more OR EQUAL 100
  // while there's just 4 duplicate ids across the 8004 DB items
  // still better than making additional fetch

  const client = axios.create()
  axiosRetry(client, retryParams)

  const response = await client
    .post(baseURL, data, params)
    .then((data) => data.data.result)
    .then((data: string[]) => {
      const responseData = [...new Set(data)]
      return responseData
    })

  return response
}

export const fetchCustomBrand = async (brand: string): Promise<string[]> => {
  const data = {
    action: 'filter',
    params: { brand }
  }

  const client = axios.create()
  axiosRetry(client, retryParams)

  const response = await client.post(baseURL, data, params).then((data) => data.data.result)

  return response
}

export const fetchCustomSearch = async (search: string): Promise<string[]> => {
  const data = {
    action: 'filter',
    params: { product: search }
  }

  const client = axios.create()
  axiosRetry(client, retryParams)

  const response = await client.post(baseURL, data, params).then((data) => data.data.result)

  return response
}

export const fetchItems = async (ids: string[]): Promise<ValantisItem[]> => {
  const data = { action: 'get_items', params: { ids } }

  const client = axios.create()
  axiosRetry(client, retryParams)

  const response: ValantisItem[] = await client
    .post(baseURL, data, params)
    .then((resp): ValantisItem[] => resp.data.result)
    .then((data): ValantisItem[] => [...new Set(data)])

  // pretty slow duplicate filter (comparing to new Set())
  // but while filtering values being nested props
  // i consider it's appropriate

  const filtered = response.filter((item: ValantisItem, index: number, self: ValantisItem[]) => {
    const firstIndex = self.findIndex((i) => i.id === item.id)
    return firstIndex === index
  })

  // random image for every item

  const withImgs = filtered.map((item) => {
    const decimal = parseInt(item.id.substring(0, 2), 16) % 50
    return {
      ...item,
      img: `/src/assets/jewelry/image${decimal}.jpg`
    }
  })

  return withImgs
}

export const fetchPrice = async (price: number) => {
  const data = { action: 'filter', params: { price } }

  const client = axios.create()
  axiosRetry(client, retryParams)

  const response: ValantisItem[] = await client
    .post(baseURL, data, params)
    .then((resp): ValantisItem[] => resp.data.result)
    .then((data): ValantisItem[] => [...new Set(data)])

  return response
}

export const fetchBrands = async () => {
  const data = [
    'Piaget',
    'Jacob & Co',
    'Cartier',
    'Bibigi',
    'Van Cleef & Arpels',
    'Pomellato',
    'Bvlgari',
    'Pasquale Bruni',
    'ЭПЛ Якутские бриллианты',
    'Chopard',
    'Baraka',
    'Casato',
    'Imma',
    'Faberge',
    'Roberto Coin',
    'Damiani',
    'Carrera y Carrera',
    'De Beers',
    'Audemars Piguet',
    'Mikimoto',
    'Giorgio Visconti',
    'Stephen Webster',
    'Chaumet',
    'Tiffany & Co',
    'Franck Muller',
    'De Grisogono',
    'Mauboussin',
    'Casa Gi',
    'Alfieri & St.John'
  ]

  return data

  // hard-coding imo is the best option to reduce DB server workload
  // while fiding the whole list of brands is about fetching all the items by param
  // still trying to stay inside the limit of 100
  // but i'll leave it here just in case

  // const data = {
  //   action: 'get_fields',
  //   params: { field: 'brand' },
  // }

  // const response = await axios
  //   .post(baseURL, data, params)
  //   .then((data) => [...new Set(data.data.result)].filter((el) => el))

  // return response
}
