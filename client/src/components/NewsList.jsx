import React from 'react'
import NewsCard from './NewsCard'
import { Container } from '@mui/material';
const NewsList = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 10, display:"flex", justifyContent:"space-between" }}>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
    </Container>
  )
}

export default NewsList