import { Sparkles, SquarePen } from 'lucide-react'
import React from 'react'

function WriteArticle() {
  const artilceLength=[
    {
      length:500,
      label:"Short (500-800 word)"
    },
    {
      length:800,
      label:"Medium (800-1200 word)"
    },
    {
      length:1200,
      label:"Long (1200+ word)"

    }
  ]
  const [article, setArticle] = React.useState("");
  const [length, setLength] = React.useState(500);
  return (
    <div className='flex flex-wrap p-4 gap-4 h-full overflow-y-auto mb-10'>
      {/* left */}
      <div className='bg-white shadow flex-none h-fit  p-4 rounded-md max-w-lg w-full'>
        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Sparkles  className='text-blue-500'/> Article Configuration</h2>

        <form action="">
          <p className='text-sm mb-2'>Article Topic</p>
          <input className='border border-gray-400 rounded-md p-2 text-sm w-full outline-0 mb-4' type="text" name="article" id="article"  placeholder='The future or artificial intelligence is ...' value={article} onChange={(e)=>setArticle(e.target.value)}/>

             <p className='text-sm mb-2'>Article Length</p>
        <div className='flex flex-wrap gap-3 max-w-80'>
            {artilceLength.map((item)=>(
              <span onClick={()=>setLength(item.length)} key={item.length} className={`text-[12px] cursor-pointer border border-gray-400 w-fit py-0.5 px-2 rounded-full ${length==item.length && "bg-blue-400/10 border-blue-500! text-blue-500!"}`}>{item.label}</span>
            ))}
        </div>
       
        
         

          <button type='submit' className='bg-linear-to-r from-blue-500 to-blue-300 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10'><SquarePen /> Generate aticle</button>

        </form>

      </div>


      {/* right */}
      <div className='bg-white shadow  p-4 rounded-md max-w-lg w-full max-h-96  h-full flex flex-col overflow-hidden'>

        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><SquarePen className='text-blue-500'/> Article Configuration</h2>
          <div className='h-full  flex items-center justify-center '>
            <div className='flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center'>
              <SquarePen />
              <p>Enter a topic and click “Generate article ” to get started</p>
            </div>
          </div>

      </div>
    </div>
  )
}

export default WriteArticle