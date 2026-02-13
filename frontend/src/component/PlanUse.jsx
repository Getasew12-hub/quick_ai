import React from 'react'
import {PricingTable} from "@clerk/clerk-react"

function PlanUse() {
  return (
    <div className='max-w-5xl mx-auto my-20 px-5'>
        <div className='text-center'>
        <h2 className='font-semibold  text-gray-800 text-3xl sm:text-4xl md:text-5xl'>Choose Your Plan</h2>
        <p className='text-gray-500 mb-10 mt-2 max-w-lg mx-auto'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>

        </div>

        <div className='mt-8 max-sm:mt-4 mx-2.5 flex   '>
        <PricingTable/>
        </div>
    </div>
  )
}

export default PlanUse