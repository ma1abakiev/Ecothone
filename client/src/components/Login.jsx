import { Box, TextField, Button } from '@mui/material'
import React from 'react'


const Login = () => {
  return (
    <Box
    sx={{
        
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        justifyContent: 'center',
        width: '450px',
        margin: "100px auto"
    }}
    component="form"
    noValidate
    autoComplete="off"
>
    <TextField sx={{ width: '100%' }} id="outlined-basic" label="Никнейм" variant="outlined" color="secondary" />
    <TextField sx={{ width: '100%' }} id="outlined-basic" label="Пароль" variant="outlined" color="secondary" />
    <Button color='secondary' variant="contained">Contained</Button>
</Box>
  )
}

export default Login