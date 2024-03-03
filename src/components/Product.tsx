import { CheckIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline'

import { observer } from 'mobx-react'
import { ValantisItem } from '../types'
import { appStore } from '../store'

type Props = { item: ValantisItem }

export const Product = observer(({ item }: Props) => {
  const { cart, addToCart, removeFromCart } = appStore
  const { brand, price, product, id, img } = item

  const productInCart = (
    <div className="in-cart">
      <div className="cart-buttons__in-cart">
        <CheckIcon strokeWidth={2} className="cart-buttons__big" />
        <span>In cart</span>
      </div>
      <button className="in-cart__icon" onClick={() => removeFromCart(id)}>
        <TrashIcon strokeWidth={2} className="icon" />
      </button>
    </div>
  )

  const productNotInCart = (
    <button className="not-in-cart" onClick={() => addToCart(id)}>
      <ShoppingBagIcon strokeWidth={2} className="cart-buttons__add" />
      <span className="cart-buttons__text">Add to cart</span>
    </button>
  )

  return (
    <article className="cart__container " id={id}>
      <div className="cart__image">
        <img src={img} alt={product} />
      </div>
      <div className="cart__name">{product}</div>
      <div className="cart__brand">{brand || 'Valantis'}</div>
      <div className="cart__id">{id}</div>
      <div className="cart__price">
        <span>{price} руб</span>
      </div>
      {cart.slice().includes(id) ? productInCart : productNotInCart}
    </article>
  )
})
