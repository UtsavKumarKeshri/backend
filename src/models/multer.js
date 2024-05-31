import multer from "multer";
import path from "path";

const storagePath = path.resolve("src", "static", "images")
    const storage = multer.diskStorage({
        destination:(req, file, cb)=>{
           cb(null, storagePath);
        },
        filename: (req, file, cb)=>{
            const updatedFileName = Date.now()+file.originalname;
            cb(null, updatedFileName);
        }
    })
    

    

export default multer ({storage});