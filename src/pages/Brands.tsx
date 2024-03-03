import { appStore, fetchedStore } from '../store'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'

export const Brands = observer(() => {
  const navigate = useNavigate()
  const { brands, getCustomBrand } = fetchedStore
  const { setBrandFilter } = appStore

  const handleBrandSelection = (brand: string | null) => {
    brand && getCustomBrand(brand)
    setBrandFilter(brand)
    navigate('/' + brand)
  }

  return (
    <>
      <div
        className="title"
        id="title"
        style={{
          fontSize: window.innerWidth > 1000 ? '44px' : '32px'
        }}
      >
        Бренды
      </div>
      <ul className="brands">
        {brands.map((brand) => (
          <button key={brand} className="brand-item" onClick={() => handleBrandSelection(brand)}>
            {brand}
          </button>
        ))}
      </ul>
    </>
  )
})
