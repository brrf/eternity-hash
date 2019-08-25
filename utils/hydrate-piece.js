const Piece = require('../schemas/pieces');

//take a pieceId and return a full piece
async function hydratePiece(pieceId) {
	const piece = await Piece.findById(pieceId);
	return piece;
}

module.exports = hydratePiece;