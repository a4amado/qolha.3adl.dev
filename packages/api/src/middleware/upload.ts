import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from "cloudinary"
import convert from "convert"
import multer from "multer";
import { v4 } from "uuid";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    
})



const storage = new CloudinaryStorage({
    cloudinary: cloudinary ,
    params: {
        public_id: (_req, _file) => v4()+ ".weba",
        // @ts-ignore
        folder: 'qolha-clips',
        // @ts-ignore
        format: async (_req, _file) => 'weba', // supports promises as well
        resource_type : "raw"
        
    },


});




const upload = multer({
    storage,
    limits: {
        fileSize: convert(20, "kilobytes").to("byte")
    }
});

export default upload;
