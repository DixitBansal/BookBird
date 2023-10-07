import React from 'react'
import { Outlet } from 'react-router-dom'
import LabelBottomNavigation from '../components/bottomnav/BottomNavigation'

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <LabelBottomNavigation />
    </>
  )
}

export default MainLayout