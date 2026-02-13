import { Image, Sparkles } from 'lucide-react';
import React from 'react'

function ImageGenerate() {
 const catagorydata=["Isometric","Cartoon","Pixel art","3D","Realistic","Anime","Cyberpunk","Steampunk"];
  const [title, setTitle] = React.useState("");
  const [catagory, setCatagory] = React.useState("Isometric");
  const [isPublic, setIsPublic] = React.useState(false);
  return (
    <div className='flex flex-wrap p-4 gap-4 h-full overflow-y-auto mb-10'>
      {/* left */}
      <div className='bg-white shadow flex-none h-fit  p-4 rounded-md max-w-lg w-full'>
        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Sparkles  className='text-green-500'/> AI Image Generator</h2>

        <form action="">
          <p className='text-sm mb-2'>Describe Your Image</p>
          <textarea  rows={4}  className='border border-gray-400 max-h-96 min-h-20 rounded-md p-2 text-sm w-full outline-0 mb-4' type="text" name="article" id="article"  placeholder='Descripe what you wna to see in the image..' value={title} onChange={(e)=>setTitle(e.target.value)}></textarea>

             <p className='text-sm mb-2'>Style</p>
        <div className='flex flex-wrap gap-3 max-w-80'>
            {catagorydata.map((item,index)=>(
              <span onClick={()=>setCatagory(item)} key={index} className={`text-[12px] cursor-pointer border border-gray-400 w-fit py-0.5 px-2 rounded-full ${catagory==item && "bg-green-400/10 border-green-500! text-green-500!"}`}>{item}</span>
            ))}
        </div>

        <div className='flex gap-2.5 mt-8 items-center'>
          <button type='button' className={`relative  w-10 h-5 rounded-full ${isPublic ?  "bg-green-500": "bg-gray-300"} transition-all duration-300 `} onClick={()=>setIsPublic(!isPublic)}>
             <p className={`h-4 w-4 rounded-full bg-white  absolute top-1/2 -translate-y-1/2  ${isPublic ? " right-1": " left-1"} transition-all duration-300`}></p>
             </button>
          <span>Make this image Public</span>
        </div>
       
        
         

          <button type='submit' className='bg-linear-to-r from-green-400 to-green-600 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10'><Image /> Generate title</button>

        </form>

      </div>


      {/* right */}
      <div className='bg-white shadow  p-4 rounded-md max-w-lg w-full max-h-96  h-full flex flex-col overflow-hidden'>

        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Image className='text-green-500' /> Article Configuration</h2>
          <div className='h-full  flex items-center justify-center '>
            <div className='flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center'>
              <Image />
              <p>Enter a topic and click “Generate image ” to get started</p>
            </div>
          </div>

      </div>
    </div>
  )
}

export default ImageGenerate