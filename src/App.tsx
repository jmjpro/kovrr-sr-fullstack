import { useState } from 'react'
import Volumes from './Volumes'
import Cart from './Cart'
import './App.css'
import type { Volume } from './types'

function App() {
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)
  const [cartItems, setCartItems] = useState([] as Volume[])

  function changePageSize(size: number) {
    setPageSize(size)
    setPage(0)
  }

  return (
    <>
      <h1>Kovrr Book App</h1>
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
      <Volumes
        pageSize={pageSize}
        page={page}
        setPage={setPage}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <label>
        How many books to show per page?
        <select onChange={(e) => changePageSize(Number(e.currentTarget.value))}>
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </label>
    </>
  )
}

export default App
