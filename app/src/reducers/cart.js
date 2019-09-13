export default function cart (state = {cart: [], checkoutStep: {currentStep: 1, completed: 0}}, action) {
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
			if (typeof action.checkoutStep.currentStep !== 'number') return state;
			let completed = state.checkoutStep.completed;
			if (action.checkoutStep.completed && action.checkoutStep.currentStep > state.checkoutStep.completed) {
				console.log('here?');
				completed++;
				console.log({completed})
			}
			return {
				...state, 
				checkoutStep: {
					currentStep: action.checkoutStep.currentStep,
					completed
				}
			}
		default: return state
	}
}