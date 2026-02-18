import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'

import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import ImageGenerate from './pages/ImageGenerate'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import {Toaster} from "react-hot-toast"
import {useUser} from "@clerk/clerk-react"
import { Loader } from 'lucide-react'
function App() {
  const {isLoaded}=useUser();
if(!isLoaded) return <div className='h-screen w-full flex justify-center items-center overflow-hidden'><Loader size={35} className='animate-spin '/></div>
  return (
    <div >
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/ai' element={<Layout/>}>
             <Route index element={<Dashboard/>}/>
             <Route path='write-article' element={<WriteArticle/>}/>
             <Route path='blog-titles' element={<BlogTitles/>}/>
             <Route path='image-generate' element={<ImageGenerate/>}/>
             <Route path='remove-background' element={<RemoveBackground/>}/>
             <Route path='remove-object' element={<RemoveObject/>}/>
             <Route path='review-resume' element={<ReviewResume/>}/>
             <Route path="community" element={<Community/>}/>
        </Route>

        <Route path='*' element={<Home/>}/>
        
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App