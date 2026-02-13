import { BookText, Eraser, EraserIcon, Hash, Image, Scissors, SquarePen } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function AiTools() {
    const navigate=useNavigate();
    const {user}=useUser();
  return (
    <div className='text-center  my-20 px-5'>
        <h2 className='font-semibold text-gray-800 text-center text-3xl sm:text-4xl md:text-5xl '>Powerful AI Tools</h2>
        <p className=' mx-auto md:text-lg text-gray-500 max-w-xl mt-2.5  '>Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 mx-auto max-w-fit'>

            {toolsData.map((tool,index)=>(
                <div key={index} className={`shadow-lg  p-6 rounded-lg space-y-4 hover:scale-[1.03] transition-transform duration-150 text-left max-w-90 w-full mx-auto`} onClick={()=>user && navigate(tool.path)}>
                    <button className={` rounded-lg text-white p-3  ${tool.color}`}>{tool.icon}</button>
                    <h3 className='font-semibold text-gray-800 sm:text-2xl text-lg'>{tool.title}</h3>
                    <p className='text-gray-500 text-sm sm:text-[16px]'>{tool.description}</p> 
                </div>
            ))}
           

        </div>
    </div>
  )
}

export default AiTools


const toolsData=[
    {
       icon:<SquarePen className='sm:h-6 sm:w-6 h-4 w-4'/>,
       title:'AI Article Writer',
       description:'Generate high-quality articles in seconds with our AI-powered writing tool.',
       color:'bg-linear-to-b from-blue-500 to-sky-400 ',
       path:"/ai/article-generator"
    },
    {
        icon:<Hash className='sm:h-6 sm:w-6 h-4 w-4'/>,
        title:'Blog Title Generator',
        description:'Find the perfect, catchy title for your blog posts with our AI-powered generator.',
        color:'bg-linear-to-b from-green-500 to-emerald-400',
        path:"/ai/blog-title-generator"
     },
     {
        icon:<Image className='sm:h-6 sm:w-6 h-4 w-4'/>,
        title:'AI Image Generation',
        description:'Create stunning visuals with our AI image generation tool, Experience the power of AI',
        color:'bg-linear-to-b from-purple-500 to-fuchsia-400',
        path:"/ai/image-generator"
     },
     {
        icon:<EraserIcon className='sm:h-6 sm:w-6 h-4 w-4'/>,
        title:'Background Removal',
        description:'Effortlessly remove backgrounds from your images with our AI-driven tool.',
        color:'bg-linear-to-b from-yellow-500 to-orange-400',
        path:"/ai/background-removal"
        },
        {
            icon:<Scissors className='sm:h-6 sm:w-6 h-4 w-4'/>,
            title:'Object Removal',
            description:'Remove unwanted objects from your images seamlessly with our AI object removal tool.',
            color:'bg-linear-to-b from-pink-500 to-rose-400',
            path:"/ai/object-removal"
        },
        {
            icon:<BookText className='sm:h-6 sm:w-6 h-4 w-4'/>,
            title:'Resume Reviewer',
            description:'Get your resume reviewed by AI to improve your chances of landing your dream job.',
            color:'bg-linear-to-b from-cyan-500 to-sky-400',
            path:"/ai/resume-reviewer"



    }

]