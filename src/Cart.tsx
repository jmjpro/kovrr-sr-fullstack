import iconShoppingCart from './assets/shopping-cart-icon.svg'
import type { Volume } from './types'
import './Cart.css'

interface CartProps {
  cartItems: Volume[]
  setCartItems: React.Dispatch<React.SetStateAction<Volume[]>>
}
function Cart({ cartItems, setCartItems }: CartProps) {
  return (
    <div className="cart">
      <span>{cartItems.length}</span>
      <img src={iconShoppingCart} width="48" height="48" />
      <button
        title="Empty Cart"
        className="close"
        onClick={() => setCartItems([])}
      >
        x
      </button>
    </div>
  )
}

export default Cart
