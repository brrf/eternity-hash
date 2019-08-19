export default function checkout (state = [], action) {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				cart: [action.item]
			}
		case 'RECEIVE_CART':
			return {
				...state,
				cart: action.cart
			}
		default: return state
	}
}