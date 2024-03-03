import { observer } from 'mobx-react'

import { fetchedStore, appStore } from '../store'
import { Loader, Product } from '../components'
import { useList } from '../hooks/useList'
import { ValantisItem } from '../types'
import { NotFound } from '.'

export const ProductList = observer(() => {
  const { page } = appStore
  const { loading } = fetchedStore

  const perPage = 50

  const { list } = useList()

  if (loading) return <Loader />
  if (!list.length) return <NotFound />

  return (
    <ul className="list">
      {list?.slice(page * perPage, (page + 1) * perPage).map((item: ValantisItem, index: number) => {
        return (
          <li key={index} className="grid">
            <Product item={item} />
          </li>
        )
      })}
    </ul>
  )
})
