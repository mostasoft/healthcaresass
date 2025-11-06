import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
     <div className='flex items-center justify-center mt-10'>
        <button className='bg-black flex items-center justify-center rounded-sm text-white'>
            <Link href="./register">Get Started</Link>
        </button>
     </div>
    </div>
  )
} 

export default page
