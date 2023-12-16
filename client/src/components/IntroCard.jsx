import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/system'

const IntroCard = ({ title, text, buttonText, imageSrc }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '50px',
        border: '1px solid #ccc',
        padding: '50px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '1100px',

        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <Typography sx={{ fontSize: 80 }} variant="h2">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 20 }}>{text}</Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.secondary.main,
            padding: '20px 0',
            maxWidth: 200,
          }}
        >
          {buttonText}
        </Button>
      </Box>
      <Box sx={{ pb: 50 }}>
        <img
          src={imageSrc}
          alt="Intro"
          style={{ borderRadius: '8px', maxWidth: '400px' }}
        />
      </Box>
    </Box>
  )
}

export default IntroCard