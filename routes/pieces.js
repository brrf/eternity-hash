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
 
const upload = multer({ storage: storage })


module.exports = function (app) {
	app.route('/collection')
		.post(upload.single('image'), (req, res) => {
			console.log(req.file);
			res.json({file: req.file.filename});
		})
}

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })