const multer  = require('multer');
const path = require('path');

const Piece = require('../schemas/pieces');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + '../../app/public/pieces-images/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb(null, false);
  }
}
 
const upload = multer({ 
  storage,
  limits: {fileSize: 10000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  } })


module.exports = function (app) {
	app.route('/collection')
		.post(upload.array('images', 5), async (req, res) => {
			if(req.files) {
        console.log({fiels: req.files})
        const {title, description, price} = req.body;
        let filenames = [];
        req.files.forEach( file => {
          filenames.push(file.filename)
        })  
        console.log(filenames)   
        try {
          await Piece.create({
            thumbnails: filenames,
            title,
            description,
            price
          });
          return res.json({res: 'Your piece was added to the collection!'})
        } catch {
          return res.json({res: 'Oops, we had trouble adding your piece to the collection'})
        }
      } else {
        res.json({res: 'Error with file upload'})
      }			
		})
}