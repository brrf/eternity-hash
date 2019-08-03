const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + '../../app/public/pieces-images'))
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
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  } })


module.exports = function (app) {
	app.route('/collection')
		.post(upload.single('image'), (req, res) => {
			if(req.file) {
       return res.json({image: req.file.filename}); 
      } else {
        res.json({error: 'Error with file upload'})
      }
			
		})
}