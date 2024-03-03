import { FaceFrownIcon } from '@heroicons/react/24/outline'
import { appStore, fetchedStore } from '../store'
import { HeaderProduct } from './HeaderProduct'

export const HeaderCart = () => {
  const { cart } = appStore
  const { items } = fetchedStore

  const cartIsEmpty = (
    <div className="empty-cart">
      <FaceFrownIcon className="empty-cart__icon" />
      <span className="empty-cart__message">The cart is empty</span>
    </div>
  )

  const cartGotProducts = (
    <>
      {items
        .filter((item) => cart.slice().includes(item.id))
        .map((item) => (
          <HeaderProduct item={item} key={item.id} />
        ))}
    </>
  )

  return <div className="header-cart">{cart.length ? cartGotProducts : cartIsEmpty}</div>
}
