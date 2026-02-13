import { Hash, Sparkles, SquarePen } from 'lucide-react';
import React from 'react'

function BlogTitles() {
 const catagorydata=["Technology","Health","Finance","Education","Travel","Food","Lifestyle","Entertainment"];
  const [title, setTitle] = React.useState("");
  const [catagory, setCatagory] = React.useState("Technology");
  return (
    <div className='flex flex-wrap p-4 gap-4 h-full overflow-y-auto mb-10'>
      {/* left */}
      <div className='bg-white shadow flex-none h-fit  p-4 rounded-md max-w-lg w-full'>
        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Sparkles  className='text-purple-500'/> AI Title Generator</h2>

        <form action="">
          <p className='text-sm mb-2'>Keyword</p>
          <input className='border border-gray-400 rounded-md p-2 text-sm w-full outline-0 mb-4' type="text" name="article" id="article"  placeholder='The future or artificial intelligence is ...' value={title} onChange={(e)=>setTitle(e.target.value)}/>

             <p className='text-sm mb-2'>Category</p>
        <div className='flex flex-wrap gap-3 max-w-80'>
            {catagorydata.map((item,index)=>(
              <span onClick={()=>setCatagory(item)} key={index} className={`text-[12px] cursor-pointer border border-gray-400 w-fit py-0.5 px-2 rounded-full ${catagory==item && "bg-purple-400/10 border-purple-500! text-purple-500!"}`}>{item}</span>
            ))}
        </div>
       
        
         

          <button type='submit' className='bg-linear-to-r from-purple-400 to-purple-600 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10'><Hash /> Generate title</button>

        </form>

      </div>


      {/* right */}
      <div className='bg-white shadow  p-4 rounded-md max-w-lg w-full max-h-96  h-full flex flex-col overflow-hidden'>

        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Hash className='text-purple-500' /> Article Configuration</h2>
          <div className='h-full  flex items-center justify-center '>
            <div className='flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center'>
              <Hash />
              <p>Enter a topic and click “Generated title” to get started</p>
            </div>
          </div>

      </div>
    </div>
  )
}

export default BlogTitles