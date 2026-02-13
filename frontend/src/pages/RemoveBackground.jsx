import { Eraser, Sparkles } from 'lucide-react';
import React from 'react'

function RemoveBackground() {
  const imageAccepter=React.useRef();

  const [image, setImage] = React.useState("");

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
        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Sparkles  className='text-orange-500'/> Background Removal</h2>

        <form action="">
          <p className='text-sm mb-2'>Upload image</p>
          <input type="file" name="image" accept='image/*'  hidden ref={imageAccepter} value={image} onChange={handleImageChange}/>
          <button type="button"   className='border border-gray-400   rounded-md p-2 text-sm w-full outline-0 mb-4 text-left'     onClick={()=>imageAccepter.current.click()}>choose File</button>

          <button type='submit' className='bg-linear-to-r from-orange-400 to-orange-600 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10'><Eraser /> Remove background</button>

        </form>

      </div>


      {/* right */}
      <div className='bg-white shadow  p-4 rounded-md max-w-lg w-full max-h-96  h-full flex flex-col overflow-hidden'>

        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Eraser className='text-orange-500' /> Processed Image</h2>
          <div className='h-full  flex items-center justify-center '>
            <div className='flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center'>
              <Eraser />
              <p>Upload an image and click "Remove Background" to get started</p>
            </div>
          </div>

      </div>
    </div>
  )
}

export default RemoveBackground