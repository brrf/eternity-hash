export function addItemToCart (item) {
	return {
		type: 'ADD_ITEM_TO_CART',
		item
	}
}

export function receiveCart (cart) {
	return {
		type: 'RECEIVE_CART',
		cart
	}
}

export function updateCart (newCart) {
	return {
		type: 'UPDATE_CART',
		newCart
	}
}