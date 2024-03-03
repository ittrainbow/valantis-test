import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Catalog, Brands, Search } from '../pages'
import { Footer, Header } from '../components'

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/:id" element={<Catalog />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
