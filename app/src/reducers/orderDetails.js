export default function orderDetails (state = {accountInformation: undefined, shippingInformation: undefined, shippingRates: undefined}, action) {
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
					address: action.shippingInformation.address,
					city: action.shippingInformation.city,
					state: action.shippingInformation.state,
					zipcode: action.shippingInformation.zipcode,
					country: action.shippingInformation.country
				}
			}
		case 'SET_SHIPPING_RATES':
			return {
				...state,
				shippingRates: action.rates
			}
		default: 
			return state;
	}
}