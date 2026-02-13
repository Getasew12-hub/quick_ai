import { FileText, Sparkles } from 'lucide-react';
import React from 'react'

function ReviewResume() {
 const fileAccepter=React.useRef();

  const [file, setFile] = React.useState("");

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
        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><Sparkles  className='text-green-500'/> Resume Review</h2>

        <form action="">
          <p className='text-sm mb-2'>Upload Resume</p>
          <input type="file" name="" accept='application/pdf'  hidden ref={fileAccepter} value={file} onChange={handleImageChange}/>
          <button type="button"   className='border border-gray-400   rounded-md p-2 text-sm w-full outline-0  text-left'     onClick={()=>fileAccepter.current.click()}>choose File</button>
          <p className='text-[12px] text-gray-500 mt-1'>Supports PDF resume only.</p>

          <button type='submit' className='bg-linear-to-r from-emerald-400 to-emerald-600 w-full flex justify-center items-center gap-2.5 p-2.5 rounded-md text-white font-semibold mt-10'><FileText /> Review Resume</button>

        </form>

      </div>


      {/* right */}
      <div className='bg-white shadow  p-4 rounded-md max-w-lg w-full max-h-96  h-full flex flex-col overflow-hidden'>

        <h2 className='flex gap-4 font-bold mb-5 text-xl items-center'><FileText className='text-green-500' /> Analysis Results</h2>
          <div className='h-full  flex items-center justify-center '>
            <div className='flex flex-col items-center gap-4 text-gray-500 mt-10 justify-center'>
              <FileText />
              <p>Upload a resume and click "Review Resume" to get started</p>
            </div>
          </div>

      </div>
    </div>
  )
}

export default ReviewResume