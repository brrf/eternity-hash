export default function checkout (state = {cart: []}, action) {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				cart: [...state.cart, action.piece]
			}
		case 'RECEIVE_CART':
		console.log({cart: action.cart})
			return {
				...state,
				cart: action.cart
			}
		default: return state
	}
}