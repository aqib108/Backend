  
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage ({

    url : process.env.DB_URL, 
    file : (req, file) =>{ 
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf)=> {
                if( err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname); 
                const fileInfo =  {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo)
            })
        })
    }
})

export const upload = multer ({storage})