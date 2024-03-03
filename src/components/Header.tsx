import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import clsx from 'clsx'

import { appStore } from '../store'

import logo from '../../public/valantis.svg'
import { HeaderCart } from '.'

export const Header = observer(() => {
  const navigate = useNavigate()
  const [cartActive, setCartActive] = useState<boolean>(false)
  const [shadow, setShadow] = useState<boolean>(false)
  const { cart, sort, setSort, setBrandFilter, setSearchFilter } = appStore
  const [drawHeader, setDrawHeader] = useState<boolean>(true)
  const { pathname } = useLocation()

  useEffect(() => navigate('/'), [])

  // managing header visibility

  useEffect(() => {
    const handleScroll = () => {
      const y1 = window.scrollY
      setTimeout(() => {
        const y2 = window.scrollY
        y2 - y1 > 50 && y2 > 200 && setDrawHeader(false)
        y2 - y1 < -50 && setDrawHeader(true)
        y2 > 25 && !shadow && setShadow(true)
        y2 < 25 && shadow && setShadow(false)
        setCartActive(false)
      }, 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [shadow])

  const handleCart = () => setCartActive((prevActive) => !prevActive)

  const handleBrands = () => {
    setSearchFilter(null)
    navigate('brands')
  }

  const handleHome = () => {
    setBrandFilter(null)
    setSearchFilter(null)
    navigate('/')
  }

  const handleSearch = () => navigate('/search')

  const handlePrice = () => setSort()

  // fetching items on certain price seem to be useless  so price sort implemented instead

  const priceMessage = sort === 'asc' ? '(убывает)' : sort === 'desc' ? '(возрастает)' : ''

  return (
    <header className={clsx('header__container', !drawHeader && 'header__hidden', shadow && 'shadow')} id="header">
      <div className="header__valantis">
        <div className="header__left">+7 (985) 1349294</div>
        <div className="header__logo">
          <img src={logo} />
        </div>
        <div className="header__right">
          <button className="icon-button" onClick={handleCart}>
            <ShoppingCartIcon strokeWidth={2} className="icon" />

            {!!cart.length && <span className="header__counter">{cart.length}</span>}
          </button>
        </div>
      </div>
      <div className="header__buttons">
        <button className="header__item" onClick={handleHome}>
          Каталог
        </button>
        <button className="header__item" onClick={handleBrands}>
          Бренды
        </button>
        <button className="header__item" onClick={handleSearch}>
          Поиск
        </button>
        <button className="header__price" onClick={handlePrice} disabled={['/brands', '/search'].includes(pathname)}>
          Цена {priceMessage}
        </button>
      </div>

      {cartActive && <HeaderCart />}
    </header>
  )
})
