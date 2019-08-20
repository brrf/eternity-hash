const Piece = require('../schemas/pieces');

//take a pieceId and return a full piece
async function hydratePiece(pieceId) {
	console.log('here');
	const piece = await Piece.findById(pieceId);
	return piece;
}

module.exports = hydratePiece;