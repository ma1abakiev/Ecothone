import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { addItem } from '../services/cartSlice'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../theme'
import { toast } from 'react-toastify' // Импорт библиотеки Toastify
import 'react-toastify/dist/ReactToastify.css'
import defaultImg from '../images/default.jpeg'
import { Link } from 'react-router-dom'

export default function ProductCard({
  id,
  title,
  description,
  regular_price,
  discount_price,
  product_image,
  slug,
}) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    const newItem = {
      id,
      title,
      description,
      regular_price,
      discount_price,
      product_image,
    }

    dispatch(addItem(newItem))

    // Показываем уведомление при добавлении в корзину
    toast.success('Товар добавлен в корзину!')
  }
  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 5,
      }}
    >
      <Box>
        {product_image.length > 0 ? (
          product_image.map((item, i) => {
            return (
              <Link to={`/post/${slug}`}>
                <CardMedia
                  key={i}
                  height={300}
                  component="img"
                  alt="green iguana"
                  image={item.image}
                />
              </Link>
            )
          })
        ) : (
          <Link to={`/post/${slug}`}>
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
          </Link>
        )}
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {discount_price != null ? (
          <>
            <Typography variant="b">{discount_price}</Typography>
            <Typography
              sx={{ ml: 3, textDecoration: ' line-through' }}
              variant="s"
            >
              {regular_price}
            </Typography>
          </>
        ) : (
          <Typography variant="b">{regular_price}</Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          sx={{ width: '100%', background: colors.redAccent[800] }}
          variant="contained"
          size="large"
          onClick={handleAddToCart}
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  )
}
