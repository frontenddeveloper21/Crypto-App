import React from 'react'

const Staking = () => {
  return (
    <div className='h-screen'>
         <div className='text-lg mb-8 font-semibold'>Staking</div>
         <div className='flex h-[calc(100vh-280px)] bg-[#e6f3ff]  justify-center items-center'>
            <div className='flex flex-col gap-5'> <span className='block text-xl text-center font-bold'>Earn up to</span>
             <span className='block text-5xl text-[#1A3B5D] font-[1000] text-center'>7%</span>
             <span className='block text-xl text-center font-bold'>on supported assets</span>
             <div className='flex justify-center'><button className='text-[12px] font-semibold bg-[#1A3B5D] text-[#DADADA] px-4 py-2 rounded-md'>Start Earning</button></div></div>
         </div>
    </div>
  )
}

export default Staking