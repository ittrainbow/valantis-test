import { TrashIcon } from '@heroicons/react/24/outline'
import { ValantisItem } from '../types'
import { appStore } from '../store'
import { useList } from '../hooks/useList'
import { useNavigate } from 'react-router-dom'

type Props = {
  item: ValantisItem
}

export const HeaderProduct = ({ item }: Props) => {
  const navigate = useNavigate()
  const { id, product, price, img } = item
  const { removeFromCart, setPage, clearSearch } = appStore

  const { list } = useList()

  const handleClick = () => {
    navigate('/')
    const page = Math.floor(list.map((el) => el.id).indexOf(id) / 50)
    setPage(page)
    clearSearch()
    setTimeout(() => {
      const elem = document.getElementById(id)
      elem && elem.scrollIntoView({ block: 'end' })
    })
  }

  return (
    <article className="cart-item">
      <div className="cart-item__image">
        <img className="cart-item__img" src={img} alt={product} />
      </div>
      <div className="cart-item__description" onClick={handleClick}>
        {product}
        <span className="cart-item__price">{price} руб</span>
      </div>
      <button className="icon-button" onClick={() => removeFromCart(id)}>
        <TrashIcon strokeWidth={2} className="icon" />
      </button>
    </article>
  )
}
