import React from 'react'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
  return (
    <main className='App'>
      <Outlet />
    </main>
  )
}

export default LayOut
