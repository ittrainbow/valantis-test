import { useEffect, useState } from 'react'

import { fetchedStore, appStore } from '../store'
import { useNavigate } from 'react-router-dom'

export const Search = () => {
  const navigate = useNavigate()
  const { getCustomSearch } = fetchedStore
  const { setSearchFilter, setBrandFilter } = appStore
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const search = localStorage.getItem('valantisSearch') || ''
    setSearch(search)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    value.length ? localStorage.setItem('valantisSearch', value) : localStorage.removeItem('valantisSearch')
    setSearch(value)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchFilter(search)
    setBrandFilter(null)
    getCustomSearch(search)
    navigate('/')
  }

  return (
    <form className="search-container">
      <div className="title" id="title">
        Поиск
      </div>
      <input className="search-input" type="search" value={search} onChange={handleChange} />
      <button className="brand-item" onClick={handleSearch} disabled={!search.length} type="submit">
        Искать
      </button>
    </form>
  )
}
