import {  BookText, Eraser, Hash, Home, Image, Scissors, SquarePen, Users } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useClerk, useUser} from "@clerk/clerk-react"

function LeftSideLayout({setShowMenu}) {
    const {user}=useUser();

  const navigate = useNavigate();
  const location = useLocation();
  const ActivePath = location.pathname;
  return (
    <div>
          <div className='flex items-center gap-3 mb-5 flex-col justify-center'>
            <img src={user?.imageUrl} alt="user profile" className="h-15 w-15 rounded-full object-cover" />
          <p className='font-medium'>{user?.fullName}</p>
           </div>
        {sidebarData.map((item, index) => (
            <button
              key={index}
              className={`flex gap-2 text-sm p-3 rounded w-full  text-gray-700 items-center ${ActivePath == item.path && "bg-linear-to-r from-blue-500 to-purple-700 text-white"}`}
                onClick={() =>{ navigate(`${item.path}`); setShowMenu(false)}}
            >
              {item.icon}
              {item.title}
            </button>
          ))}

   

    </div>
  );
}

export default LeftSideLayout;


const sidebarData=[
    {
        icon:<Home size={18}/>,
        title:'Dashboard',
        path:"/ai"
    },
    {
        icon:<SquarePen size={18}/>,
        title:'Write Article',
        path:"/ai/write-article"
    },
    {
        icon:<Hash size={18}/>,
        title:'Blog Titles',
        path:"/ai/blog-titles"
    },
    {
        icon:<Image size={18}/>,
        title:'Generate Images',
        path:"/ai/image-generate"
    },
    {
        icon:<Eraser size={18}/>,
        title:'Remove Background',
        path:"/ai/remove-background"
    },
    {
        icon:<Scissors size={18}/>,
        title:'Remove Object',
        path:"/ai/remove-object"
    },
    {
        icon:<BookText size={18}/>,
        title:'Review Resume',
        path:"/ai/review-resume"
    },
    // {
    //     icon:<Users size={18}/>,
    //     title:'Community',
    //     path:"/ai/community"
    // },
]


