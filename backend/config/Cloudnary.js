import { v2 as cloudinary } from 'cloudinary';


export const cloudinaryConfig =async ()=>{
     cloudinary.config({ 
        cloud_name: 'djcy1qwuy', 
        api_key: process.env.CLOUDNARY_API_KEY, 
        api_secret: process.env.CLOUDNARY_API_SECRET
    });
}

