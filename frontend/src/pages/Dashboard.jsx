import React, { use, useEffect } from 'react'
import {Gem, Sparkles} from "lucide-react"
import { Protect } from "@clerk/clerk-react"
import DashboardCreation from '../component/DashboardCreation';
import { dummyCreationData } from '../assets/assets';

function Dashboard() {
  const [ItemData,setItemdata] = React.useState([]);

  useEffect(() => {
    setItemdata(dummyCreationData);
  }, []);
    


  return (
    <div className='p-4 h-full overflow-y-auto'>
      <div className='flex gap-4 max-sm:flex-wrap'>
        <div className='bg-white max-w-80 w-full rounded-l-md shadow p-4 flex items-center justify-between'>
          <div>
            <p className='text-sm '>Total Creations</p>
            <p className='font-bold text-xl '>0</p>
          </div>
          <button className='bg-linear-to-br from-sky-600 to-green-300 text-white p-2.5 rounded-md '>
              <Sparkles />
          </button>
          
          
        </div>

        
        <div className='bg-white max-w-80 w-full rounded-l-md shadow p-4 flex items-center justify-between'>
          <div >
            <p className='text-sm '>Active Plan</p>
            <Protect plan={"premium"} fallback={"Free"}> <p className='font-bold text-xl '>Premium</p></Protect>
          </div>
          <button className='bg-linear-to-br from-red-300 to-purple-600 text-white p-2.5 rounded-md '>
          <Gem />

          </button>
          
        </div>


      </div>


      <div className='my-10'>
        <p className='font-semibold sm:text-lg'>Recent Creations</p>

        <div className='space-y-4 mb-20'>
          {ItemData.map((item, index) => (
            <DashboardCreation key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard



