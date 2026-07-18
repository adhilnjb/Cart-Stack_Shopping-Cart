import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { CartDrawer } from './components/cart/CartDrawer'
import WelcomePage from './pages/WelcomePage'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paper">
        <Header onCartClick={() => setCartOpen(true)} />

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/shop" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </BrowserRouter>
  )
}
