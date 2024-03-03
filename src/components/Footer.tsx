import { useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'

import { appStore, fetchedStore } from '../store'
import { useList } from '../hooks/useList'

export const Footer = observer(() => {
  const navigate = useNavigate()
  const { page, setPage } = appStore
  const { loading } = fetchedStore
  const { pathname } = useLocation()

  const { list } = useList()

  const lastPage = Math.ceil(list.length / 50) - page < 2

  const handlePage = (page: number) => {
    setTimeout(() => window.scrollTo({ top: 0 }))
    setPage(page)
    navigate(page ? `/${page + 1}` : '/')
  }

  if (!loading && pathname !== '/brands' && pathname !== '/search' && !!list.length)
    return (
      <footer className="footer ">
        <div className="footer__pagination">
          <button onClick={() => handlePage(page - 1)} disabled={page === 0}>
            Prev
          </button>
          {page + 1}
          <button onClick={() => handlePage(page + 1)} disabled={lastPage}>
            Next
          </button>
        </div>
      </footer>
    )
})
