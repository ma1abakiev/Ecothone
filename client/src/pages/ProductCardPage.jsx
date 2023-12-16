import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActions, Container } from '@mui/material'
import { useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartItems } from '../services/cartSlice'
import ProductList from '../components/ProductList'
import defaultImg from '../images/default.jpeg'
import { toast } from 'react-toastify' // Импорт библиотеки Toastify
import 'react-toastify/dist/ReactToastify.css'

const ProductCardPage = () => {
  const theme = useTheme()
  const { slug } = useParams()
  const [product, setProduct] = useState()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/store/product/${slug}`
        )
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product by id:', error)
      }
    }

    fetchProduct()
  }, [slug])

  if (!product) {
    return <div>Loading...</div>
  }

  const {
    id,
    title,
    description,
    regular_price,
    discount_price,
    product_image,
    owner,
  } = product

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === id)

    if (existingItem) {
      // Если товар уже есть в корзине, увеличиваем его count
      dispatch(addItem({ ...existingItem, count: existingItem.count + 1 }))
    } else {
      // Если товара еще нет в корзине, добавляем его с count = 1
      const newItem = {
        id,
        title,
        description,
        regular_price,
        discount_price,
        product_image,
        count: 1,
        owner,
      }
      dispatch(addItem(newItem))
    }
    toast.success('Товар добавлен в корзину!')
  }
  return (
    <>
      <Card sx={{ maxWidth: '100%', padding: '50px 0 100px 0' }}>
        <Container
          maxWidth={'xl'}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box>
            {product_image.length > 0 ? (
              product_image.map((item) => {
                return (
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height={'500px'}
                    image={item.image}
                    sx={{ width: '500px', borderRadius: 10 }}
                  />
                )
              })
            ) : (
              <CardMedia
                component="img"
                alt="green iguana"
                height={'500px'}
                image={defaultImg}
                sx={{ width: '500px', borderRadius: 10 }}
              />
            )}
          </Box>

          <CardContent>
            <Typography
              sx={{ fontSize: 50 }}
              gutterBottom
              variant="h2"
              component="h2"
            >
              {title}
            </Typography>
            <Typography
              sx={{ fontSize: 25 }}
              variant="p"
              color="text.secondary"
            >
              {description}
            </Typography>
            <Box
              sx={{ mt: 10, display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '300px',
                }}
              >
                <Typography>Тип</Typography>
                <Typography>{''}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '300px',
                }}
              >
                <Typography>Производитель</Typography>
                <Typography>{owner}</Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                border: '1px solid white',
                p: 15,
                borderRadius: 10,
                gap: '50px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{ fontSize: 35, textAlign: 'center' }}
                variant="h3"
              >
                Цена
              </Typography>
              <Box sx={{ display: 'flex', gap: 10 }}>
                {discount_price ? (
                  <>
                    <Typography color="red" sx={{ fontSize: 25 }}>
                      {discount_price}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 25,
                        opacity: '50%',
                        textDecoration: 'line-through',
                      }}
                    >
                      {regular_price}
                    </Typography>
                  </>
                ) : (
                  <Typography>{regular_price}</Typography>
                )}
              </Box>
              <Button
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.neutral.light,
                  p: '15px 20px',
                  width: '100%',
                }}
                onClick={handleAddToCart}
              >
                В корзину
              </Button>
            </Box>
          </CardActions>
        </Container>
        <Container maxWidth="xl" sx={{ p: 5 }}>
          <Typography sx={{ fontSize: '35px' }}>Описание</Typography>
          <hr style={{ background: 'grey', marginTop: '25px' }} />
          <Typography maxWidth={'500px'} sx={{ fontSize: '20px', mt: 5 }}>
            {description}
          </Typography>
        </Container>
      </Card>
      <ProductList
        saleTitle={'Рекомендуем'}
        colorBg={'orange'}
        title={'Рекомендуемое'}
      ></ProductList>
    </>
  )
}

export default ProductCardPage
