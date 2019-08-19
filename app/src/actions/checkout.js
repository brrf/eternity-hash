export function addToCart (item) {
	return {
		type: 'ADD_TO_CART',
		item
	}
}

export function receiveCart (cart) {
	return {
		type: 'RECEIVE_CART',
		cart
	}
}