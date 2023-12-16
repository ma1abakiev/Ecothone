import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { Box, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectSearchText } from '../services/searchSlice'

const ProductList = ({ category = '', title, colorBg, saleTitle }) => {
  const [products, setProducts] = useState([])
  const searchText = useSelector(selectSearchText)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/store/product`)
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
  }, [category])

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {' '}
        <Typography variant="h2">{title}</Typography>
        <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
          <Link to={'/posts'}>Смотреть Все</Link>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 10, mt: 3, flexWrap: 'wrap' }}>
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((product, i) => {
            return (
              <ProductCard
                key={product.id}
                {...product}
                colorBg={colorBg}
                saleTitle={saleTitle}
              ></ProductCard>
            )
          })}
      </Box>
    </Container>
  )
}

export default ProductList
