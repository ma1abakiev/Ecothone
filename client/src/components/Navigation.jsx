import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useTheme} from "@mui/material"
import { tokens } from '../theme';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const pages = ["Эко-Продукты", "Сувениры", "Ручные изделия", "Одежда", "Обувь", "Мебель","Продукты питания", "Дом", "Детские товары" ];

function Navigation() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate()

    const redirectToAllProducts = () => {
      navigate("/posts");
    };

  return (
    <AppBar position="static" sx={{background:"transparent",  position:"relative", boxShadow:"none",  top:"50px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', display:"flex", justifyContent:"space-between"} }}>
            {pages.map((page) => (
              <Button
              onClick={redirectToAllProducts}
                key={page}
                sx={{ my: 2,  display: 'block', color:colors.grey[100] }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;