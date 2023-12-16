import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '../components/Layout'
import Home from './Home'
import Auth from './Auth'
import ProductCardPage from './ProductCardPage'
import AllProducts from './AllProducts'
import Cart from './Cart'
import Favorite from './Favorite'

const queryClient = new QueryClient()

const Routing = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route path="post/:slug" element={<ProductCardPage />} />
            <Route path="posts" element={<AllProducts />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path='favorite' element={<Favorite/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default Routing
