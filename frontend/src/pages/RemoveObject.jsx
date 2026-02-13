import { Scissors, Sparkles } from 'lucide-react';
import React from 'react'

function RemoveObject() {
 const imageAccepter=React.useRef();

  const [image, setImage] = React.useState("");
const [Description, setDescription] = React.useState("");


  function handleImageChange(e){
const file=e.target.files[0];
if(file){
// Process the selected image fileconsole.log("Selected file:", file);
const reader=new FileReader();
reader.onloadend=()=>{
setImage(reader.result);
 }; 
reader.readAsDataURL(file);




}
}



  
  return (
    <div className='flex flex-wrap p-4 gap-4 h-full overflow-y-auto mb-10'>
      {/* left */}
      <div className='bg-white shadow flex-none h-fit  p-4 rounded-md max-w-lg w-full'>
        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Sparkles  className='text-blue-500'/> Object Removal</h2>

        <form action="">
          <p className='text-sm mb-2'>Upload image</p>
          <input type="file" name="image" accept='image/*'  hidden ref={imageAccepter} value={image} onChange={handleImageChange}/>
          <button type="button"   className='border border-gray-400   rounded-md p-2 text-sm w-full outline-0 mb-4 text-left'     onClick={()=>imageAccepter.current.click()}>choose File</button>

            <p className='text-sm mb-2'>Describe object name to remove</p>
            <textarea  rows={4}  className='border border-gray-400 max-h-96 min-h-20 rounded-md p-2 text-sm w-full outline-0 '   placeholder='e.g., watch or spoon , Only single object name' value={Description} onChange={(e)=>setDescription(e.target.value)}></textarea>

          <button type='submit' className='bg-linear-to-r from-blue-400 to-purple-600 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10'><Scissors /> Remove background</button>

        </form>

      </div>


      {/* right */}
      <div className='bg-white shadow  p-4 rounded-md max-w-lg w-full max-h-96  h-full flex flex-col overflow-hidden'>

        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Scissors className='text-blue-500' /> Processed Image</h2>
          <div className='h-full  flex items-center justify-center '>
            <div className='flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center'>
              <Scissors />
              <p>Upload an image and click "Remove Background" to get started</p>
            </div>
          </div>

      </div>
    </div>
  )
}

export default RemoveObject