const path = require('path');

module.exports = function (app) {
	app.route('/authentication')
		.get( (req, res) => {
			res.sendFile(path.join(__dirname, '../public/authenticate.html'))
		})
}