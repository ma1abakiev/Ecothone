import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCartItems,
  removeItem,
  addItem,
  removeOneItem,
} from '../services/cartSlice'
import { Box, Button, CardActions, Container, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import defaultImg from '../images/default.jpeg'
import { toast } from 'react-toastify' // Импорт библиотеки Toastify
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

  const handleAddItem = (item) => {
    dispatch(addItem(item))
  }

  const handleRemoveOneItem = (item) => {
    dispatch(removeOneItem(item))
  }

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item))
    toast.error('Товар удалён с корзины!')
  }
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.count, 0)
  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + (item.discount_price || item.regular_price) * item.count,
    0
  )
  console.log(cartItems)

  return (
    <Container maxWidth="xl">
      <h2>Корзина товаров</h2>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginTop: 5,
        }}
      >
        <Container
          sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}
        >
          {cartItems.map((item) => (
            <>
              <Card
                sx={{ display: 'flex', maxWidth: '40%', position: 'relative' }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={
                    item.product_image[0].image
                      ? item.product_image[0].image
                      : defaultImg
                  }
                  alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {item.title}
                    </Typography>
                    {item.discount_price ? (
                      <Typography>
                        {item.count * item.discount_price}
                      </Typography>
                    ) : (
                      <Typography>{item.count * item.regular_price}</Typography>
                    )}
                  </CardContent>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                  >
                    <IconButton
                      sx={{ position: 'absolute', right: '0', top: '0' }}
                      onClick={() => handleRemoveItem(item)}
                      aria-label="Удалить"
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid black',
                        gap: 3,
                      }}
                    >
                      <Button
                        onClick={() => handleRemoveOneItem(item)}
                        variant="contained"
                        color="secondary"
                      >
                        -
                      </Button>

                      <Typography>{`${item.count} Шт`}</Typography>
                      <Button
                        onClick={() => handleAddItem(item)}
                        variant="contained"
                        color="secondary"
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>
              {/* <Box
            maxWidth="lg"
            sx={{
              display: 'flex',
              mt: 5,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              border: '1px solid white',
              p: 5,
            }}
          >
            <Card key={item.id} sx={{ width: 300 }}>
              <CardActionArea>
                <Box>
                  {item.product_image.length > 0 ? (
                    item.product_image.map((item) => {
                      return (
                        <CardMedia
                          height={300}
                          component="img"
                          alt="green iguana"
                          image={item.image}
                        />
                      )
                    })
                  ) : (
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height={300}
                      image={defaultImg}
                      sx={{
                        width: '300px',
                        borderRadius: 10,
                      }}
                    />
                  )}
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="p" color="secondary">
                    {item.text}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Box width={'355px'}>
              <Typography>{item.description}</Typography>
              <Box
                onClick={() => handleRemoveItem(item)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <IconButton aria-label="Удалить">
                  <DeleteIcon></DeleteIcon>
                </IconButton>
                <Typography>Удалить</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid black',
                gap: 3,
              }}
            >
              <Button
                onClick={() => handleRemoveOneItem(item)}
                variant="contained"
                color="secondary"
              >
                -
              </Button>

              <Typography>{`${item.count} Шт`}</Typography>
              <Button
                onClick={() => handleAddItem(item)}
                variant="contained"
                color="secondary"
              >
                +
              </Button>
            </Box>
            {item.discount_price ? (
              <Typography>{item.count * item.discount_price}</Typography>
            ) : (
              <Typography>{item.count * item.regular_price}</Typography>
            )}
          </Box> */}
            </>
          ))}
        </Container>
        <Box>
          <Box
            width={250}
            sx={{
              border: '1px solid white',
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{`${totalItemsCount} Товара`}</Typography>
              <Typography variant="h4">{`${totalAmount} Сом`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Итого</Typography>
              <Typography variant="h3">{`${totalAmount} Сом`}</Typography>
            </Box>
            <Button variant="contained" color="secondary">
              Оформить заказ
            </Button>
          </Box>
        </Box>
      </Container>
    </Container>
  )
}

export default Cart
