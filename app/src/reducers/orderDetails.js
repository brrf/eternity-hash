export default function orderDetails (state = {accountInformation: {}, shippingInformation: {}}, action) {
	console.log()
	switch (action.type) {
		case 'SET_ACCOUNT_INFORMATION':
			return {
				...state,
				accountInformation: {
					email: action.accountInformation.email,
					fname: action.accountInformation.fname,
					lname: action.accountInformation.lname
				}
			}
		case 'SET_SHIPPING_INFORMATION':
			return {
				...state,
				shippingInformation: {
					address1: action.shippingInformation.address1,
					address2: action.shippingInformation.address2,
					city: action.shippingInformation.city,
					state: action.shippingInformation.state,
					zipcode: action.shippingInformation.zipcode
				}
			}
		default: 
			return state;
	}
}