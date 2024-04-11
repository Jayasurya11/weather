import React from 'react'
import { Outlet } from 'react-router-dom'
const HomePage:React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
        <div className='bg-blue-300'>
          <h1 className='text-2xl font-bold text-center w-full  py-6 border-b'>Weather App</h1>
        </div>
        
        <Outlet/>
        <div className='bg-blue-300 w-full text-center py-4 border shadow-sm'>
          <p className='text-gray-800'>Created by Jayasurya E</p>
        </div>
    </div>
  )
}

export default HomePage