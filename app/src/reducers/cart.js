export default function cart (state = {cart: []}, action) {
	switch (action.type) {
		case 'ADD_ITEM_TO_CART':
			return {
				...state,
				cart: [...state.cart, action.item]
			}
		case 'RECEIVE_CART':
			return {
				...state,
				cart: action.cart
			}
		case 'UPDATE_CART':
			return {
				...state,
				cart: action.newCart
			}
		default: return state
	}
}