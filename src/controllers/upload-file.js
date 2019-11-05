import multer from 'multer'

const uploadImagesExchange = (req, res) => {
    const files = req.files
    if (!files) {
        res.status(400).json({ message: "Can't upload file!" })
    }
    else res.status(200).json(files.map(file=>file.path))
}

var storageImagesExchange = multer.diskStorage({

    destination: function (req, file, cb) {
        const now = new Date()
        const path = `./public/upload/images`
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
    }
})

var uploadImagesExchangeMulter = multer({ storage: storageImagesExchange })



export default { uploadImagesExchange, uploadImagesExchangeMulter }