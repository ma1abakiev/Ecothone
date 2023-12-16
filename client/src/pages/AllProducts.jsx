import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [url, setUrl] = useState('http://localhost:8000/api/store/product/')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [url])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/store/category/'
        )
        setCategory(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()

    selectedCategories.forEach((item) => {
      params.append('category_id', item)
    })

    setUrl(`http://localhost:8000/api/store/product/?${params.toString()}`)
  }, [selectedCategories])

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== categoryId)
      )
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, categoryId])
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <FormGroup
          sx={{
            width: '250px',
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {category.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  color="secondary"
                  checked={selectedCategories.includes(item.id)}
                  onChange={() => handleCategoryChange(item.id)}
                />
              }
              label={item.name}
            />
          ))}
        </FormGroup>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2">{'Все Продукты'}</Typography>
          <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
            Смотреть Все
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 10, mt: 3, flexWrap: 'wrap' }}>
          {products.map((product) => (
              <ProductCard key={product.id} {...product}></ProductCard>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default AllProducts
