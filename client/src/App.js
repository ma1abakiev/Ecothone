import React from 'react'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@mui/system'
import { ColorModeContext, useMode } from './theme'

import Routing from './pages/route'
import { Provider } from 'react-redux'
import store from './services/store'

const App = () => {
  const [theme, colorMode] = useMode()
  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Routing></Routing>
            <ToastContainer />
          </ThemeProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  )
}

export default App
