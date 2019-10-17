const crypto = require('crypto');
const hash = crypto.createHash('md5');

function hashMessage (message) {
	return hash.update(message).digest('hex');
}

module.exports = hashMessage;