import React, { use } from 'react'
import {assets} from '../assets/assets' 
import { ArrowRight } from 'lucide-react';
import {useClerk,useUser,UserButton} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate();
  const {user} = useUser();
  const {openSignIn} = useClerk();

 
  return (
    <div className='flex justify-between items-center p-3.5 md:px-10 lg:px-20 backdrop-blur-2xl  xl:px-32 2xl:px-40  bg-cover bg-bottom bg-no-repeat fixed inset-x-0 top-0 z-50'>

       <img src={assets.logo} alt="logo image"  className='h-8 md:h-10 lg:h-12' />

       {user ? <UserButton  /> :
        <button onClick={openSignIn} className='flex cursor-pointer justify-center items-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-full py-2 px-4 text-sm'>Get started <ArrowRight size={18}/></button>}
    </div>
  )
}

export default Navbar