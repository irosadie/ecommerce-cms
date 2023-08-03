import React from 'react'

const NotFound = () => {
  return (
    <div className='bg-white w-full h-screen flex justify-center items-center'>
      <div className='grid justify-center space-y-4'>
        <p className='font-extrabold text-6xl'>NOT FOUND</p>
        <span className='font-medium text-center'>your link/ params is not valid</span>
      </div>
    </div>
  )
}

export default NotFound
