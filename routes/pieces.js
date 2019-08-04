const multer  = require('multer');
const path = require('path');
const passport = require('passport');
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

  app.get('/collection', async (req, res) => {
    let collection = await Piece.find({})
    collection = collection.filter(piece => piece.thumbnails.length !== 0)
    res.json({collection})
  });

	app.route('/addpiece')
    .post(upload.array('images', 5), async (req, res) => {    
      if(req.user.email !== 'admin@gmail.com') {
        return res.json({res: 'admin only'})
      }
			if(req.files) {
        const {title, description, price} = req.body;
        let filenames = [];
        req.files.forEach( file => {
          filenames.push(file.filename)
        })   
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
    .delete(async (req, res) => {
      if(!req.body.id) return res.json({res: 'provide an _id'});
      try {
        await Piece.findByIdAndDelete(req.body.id)
        return res.json({res: 'Piece was deleted'})
      } catch {
        return res.json({res: 'Could not delete'})
      }
    })
}