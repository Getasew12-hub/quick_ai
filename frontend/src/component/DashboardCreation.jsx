import React from 'react'
import Markdown from "react-markdown";
function DashboardCreation({item}) {
    const [moreData,setMoreData] = React.useState(false);
  return (
 <div onClick={()=>setMoreData(!moreData)} className='max-w-4xl w-full bg-white rounded-md shadow p-4 cursor-pointer'>
    <div  className=' flex items-center justify-between mt-4 gap-4 max-sm:flex-col max-sm:items-start '>

        <div>
            <p className=''>{item?.prompt}</p>
            <p className='text-sm text-gray-500 mt-2'>
                {item.type}- {new Date(item?.create_at).toLocaleString()}</p>
        </div>

        <div className='max-sm:text-right max-sm:w-full '>
            <button className='bg-blue-400/10 border border-blue-500 py-1 px-3.5 text-blue-500 rounded-full h-fit text-nowrap text-sm'>
                {item.type}
            </button>
        </div>
     
    
    </div>
    

  <div className='hellow rever-rw overflow-x-hidden!' >
        {moreData && (item?.type=="image" ? <img src={item?.content} alt="image" className='max-h-96! max-sm:h-60! object-cover! max-w-full! '/> :<Markdown>{item?.content}</Markdown>) }
      </div>
</div>
  )
}

export default DashboardCreation