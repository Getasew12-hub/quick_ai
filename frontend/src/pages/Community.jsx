import React, { useEffect } from 'react'
import { dummyPublishedCreationData } from '../assets/assets';
import {useUser} from "@clerk/clerk-react"
import { Heart } from 'lucide-react';

function Community() {
  const [creations, setCreations] = React.useState([]);
  const {user}=useUser();

  useEffect(()=>{
    if(user){
      //fetch creations from database and setCreations
      setCreations(dummyPublishedCreationData);
    }
  },[user])


  return (
    <div className='p-4 h-full overflow-y-auto'>
      <p className='font-semibold text-lg'>Creations</p>
      
      <div className='mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded-md shadow'>
        {creations.map((creation)=>(
          <div key={creation.id} className='group relative  rounded-md overflow-hidden '>
            <img src={creation.content}  className='h-full w-full object-cover'/>

            <div  className=' translate-y-full group-hover:translate-y-0 transition-transform duration-300 absolute  inset-0  p-2 bg-linear-to-t from-black to-transparent text-white/80 flex justify-between items-end text-sm max-sm:text-[10px] '>
            <p className='break-all'>{creation.prompt}</p>
            <p className='flex items-center gap-1 '>{creation.likes.length}<Heart size={18}/></p>

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Community