
import React from 'react'
import StayResult from './StayResult'
import { DHotel, DLocation } from '@/app/fakedb'

const page = () => {
  const location = DLocation ;
  const hotel = DHotel
  return (
    <div className='h-fit w-screen bg-[#d4cece]' >
      <StayResult location={location}  hotel={hotel}/>
    </div>
  )
}

export default page
