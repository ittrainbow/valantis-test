import { ProductList } from '.'
import { appStore } from '../store'
import { observer } from 'mobx-react'

export const Catalog = observer(() => {
  const { brandFilter, searchFilter } = appStore
  const emptyMessage = 'Каталог ювелирных украшений'
  const brandMessage = `Украшения ${brandFilter}`
  const filterMessage = `поиск по запросу "${searchFilter}"`

  const message = brandFilter
    ? brandMessage
    : searchFilter
      ? filterMessage
      : emptyMessage

  return (
    <section className="catalog-container">
      <div
        className="title"
        id="title"
        style={{ fontSize: window.innerWidth > 1000 ? '32px' : '24px' }}
      >
        {message}
      </div>
      <ProductList />
    </section>
  )
})
