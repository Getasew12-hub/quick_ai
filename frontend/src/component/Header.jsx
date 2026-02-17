import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'

function Header() {
  const navigate=useNavigate();
  const {user}=useUser();
  const {openSignIn}=useClerk()
  return (
    <div className='bg-[url("/gradientBackground.png")] bg-cover bg-center bg-no-repeat mt-0 flex flex-col items-center justify-center px-5  h-screen'>
    <div className='max-w-150 max-sm:max-w-90 lg:max-w-200  mx-auto space-y-5  '>
         <h1 className=' max-sm:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mt-10  '>Create amazing content<br/> with <span className='bg-linear-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text'>AI tools</span></h1>

         <p className='text-gray-500 max-sm:text-sm max-w-120 mx-auto'>Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.</p>

         <div className='flex gap-5 text-sm justify-center mt-8'>
            <button className='bg-linear-to-r from-blue-500 to-indigo-600 rounded-md hover:scale-105  py-2.5 px-5 text-white transition-transform duration-150' onClick={()=>user ? navigate("/ai") : openSignIn()}>Start creating now</button>
            <button  className='bg-what border border-gray-400 hover:scale-105 rounded-md py-2 px-5 transition-transform duration-150'>Watch demo</button>

         </div>

         
         <div className='flex items-center gap-2 justify-center mt-10'>
            <img src={assets.user_group} alt="trust peoples" className='h-8' />
            <p>Trusted by 10k+ people</p>
         </div>


     
    </div>

     <div className='relative max-w-6xl w-full   overflow-hidden  mx-auto mt-20 '>
        {/* left shadow */}
        <div className='absolute top-0 left-0 bottom-0 bg-linear-to-r from-white to-transparent z-30 w-56 max-sm:w-28'> </div>
        {/* right shadow */}
        <div className='absolute top-0 right-0 bottom-0 bg-linear-to-r from-transprent to-white z-30 w-56 max-sm:w-28 '> </div>

            <div className='inline-flex   w-max amimatesScroll '>
          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/netflix.svg" alt="netflex" className='object-cover mx-6 w-full h-full' />
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/google.svg" alt="google" className='object-cover mx-6 w-full h-full'/>
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/linkedin.svg" alt="linkedin"  className='object-cover mx-6 w-full h-full' />
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/instagram.svg" alt="instagram" className='object-cover mx-6 w-full h-full' />

            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/facebook.svg" alt="facebook" className='object-cover mx-6 w-full h-full' />
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/slack.svg" alt="slack"  className='object-cover mx-6 w-full h-full'/>
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/framer.svg" alt="framer" className='object-cover mx-6 w-full h-full' />



          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/netflix.svg" alt="netflex" className='object-cover mx-6 w-full h-full' />
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/google.svg" alt="google" className='object-cover mx-6 w-full h-full'/>
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/linkedin.svg" alt="linkedin"  className='object-cover mx-6 w-full h-full' />
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/instagram.svg" alt="instagram" className='object-cover mx-6 w-full h-full' />

            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/facebook.svg" alt="facebook" className='object-cover mx-6 w-full h-full' />
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/slack.svg" alt="slack"  className='object-cover mx-6 w-full h-full'/>
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/framer.svg" alt="framer" className='object-cover mx-6 w-full h-full' />
          

         
            </div>
        
         
          </div>
    </div>
  )
}

export default Header