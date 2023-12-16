import React from 'react'
import Header from '../components/Header'
import Intro from '../components/Intro'
import ProductList from '../components/ProductList'
import { Modal } from '@mui/material'
import NewsList from '../components/NewsList'

const Home = () => {
  return (
    <>
      <Intro />

      <ProductList
        saleTitle={'Aкция'}
        colorBg={'red'}
        category=""
        title={'Товары'}
      />

      {/* <NewsList/> */}
    </>
  )
}

export default Home
