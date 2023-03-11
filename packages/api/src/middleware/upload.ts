import multer from "multer";
import convert from "convert"
import { v4 } from "uuid";


import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: "dqupwj1l6",
    api_key: "415148447655815",
    api_secret: "ZgN9zFFQcJIGQmpGMULRzSyo6-Q",
    
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary ,
    params: {
        public_id: (req, file) => v4()+ ".weba",
        // @ts-ignore
        folder: 'some-folder-name',
        // @ts-ignore
        // format: async (req, file) => 'weba', // supports promises as well
        resource_type : "raw"
        
    },


});




const upload = multer({
    storage,
 
});

export default upload;
