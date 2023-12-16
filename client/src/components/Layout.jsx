import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const Layout = () => {
  return (
    <>
      <Header />
      <Navigation/>
      <Outlet />
    </>
  )
}

export default Layout
