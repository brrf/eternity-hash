export default function cart (state = {cart: [], checkoutStep: 1}, action) {
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
		case 'SET_CHECKOUT_STEP':
			if (typeof action.step !== 'number') return state;
			return {
				...state, 
				checkoutStep: action.step
			}
		default: return state
	}
}