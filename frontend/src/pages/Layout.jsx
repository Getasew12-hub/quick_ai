import { Outlet } from 'react-router-dom'
import { Protect, SignIn, useClerk, UserButton, UserProfile } from '@clerk/clerk-react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { useLocation } from "react-router-dom"
import LeftSideLayout from '../component/LeftSideLayout'
import { LogOut, Menu, X } from 'lucide-react'
import { use, useEffect, useRef, useState } from 'react'

function Layout() {
  const leftsideref =useRef();
  const [showMenu, setShowMenu] = useState(false);
  const navigate=useNavigate();
  const {user,}=useUser();
  const {signIn,openUserProfile,signOut}=useClerk();


  useEffect(()=>{
    document.addEventListener("mousedown",(e)=>{
      if(!leftsideref.current.contains(e.target)){
        setShowMenu(false);
      }
    })


  })


  return user ? (
    <div className='flex flex-col h-screen overflow-hidden '>
     <nav className=' p-3 md:px-10 lg:px-20   xl:px-32 2xl:px-40 border-b border-gray-300  '>
      <img src={assets.logo} alt="logo image" className='h-8 md:h-10 lg:h-12' onClick={()=> navigate("/")}/>

     {!showMenu ? <Menu size={20} className='md:hidden absolute right-5 top-4 cursor-pointer' onClick={()=>setShowMenu(true)}/>:
      <X size={20} className='md:hidden absolute right-5 top-4 cursor-pointer' onClick={()=>setShowMenu(false)}/>}
     </nav>
   

 
      <div className='flex  h-full relative max-h-full overflow-y-auto '>

        {/* left side */}
         <div className={`max-w-60 w-full border-r border-gray-300  max-md:absolute max-md:z-50 bg-white h-full flex-none  flex flex-col transition-transform duration-300 ease-in-out ${showMenu ? "translate-x-0" :"max-md:-translate-x-full"}`} ref={leftsideref}>
          <div className='flex-1 p-5 '>
        

        <LeftSideLayout setShowMenu={setShowMenu}/>

          </div >

           <div className='border-t px-5 pb-6 pt-2 border-gray-500 flex items-center gap-2 justify-between'>
            <div className='flex justify-center items-center gap-2 cursor-pointer' onClick={openUserProfile} >

                 <img src={user.imageUrl} alt="logo image" className='h-6 w-6 rounded-full object-cover' />
                 <div>
                <p className='text-sm'>{user?.fullName}</p>
                <p className='text-[12px]'>
               <Protect plan={"premium"} fallback={"Free"}>Premium</Protect> plan
                </p>
               
                 </div>
            </div>

            <button className='text-gray-500 hover:text-gray-700'><LogOut size={18} onClick={signOut}/></button>
           </div>

       
         </div>

         {/* right side */}
          <div className='bg-gray-100 w-full h-full '>
           <Outlet/>
          </div>
          


      </div>
        
       
    </div>
  ):
  <div className='flex items-center justify-center h-screen'>
<SignIn/>
</div>


}

export default Layout