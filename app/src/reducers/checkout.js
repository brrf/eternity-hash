export default function checkout (state = {unregisteredCart: false}, action) {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				unregisteredCart: true
			}
		default: return state
	}
}