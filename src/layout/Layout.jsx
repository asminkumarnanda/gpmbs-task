import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

import { Outlet } from 'react-router-dom'
const Layout = () => {

  return (
    
    <div>
     {/* HEADER INCLUDE */}
      <Header/>
      {/* SIDEBAR INCLUDE */}
      <Sidebar/>
      {/* MAIN CONTENT */}
      <Outlet/>

      {/* FOOTER INCLUDE */}
      <Footer/>
    </div>
  )
}

export default Layout
