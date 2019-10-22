export function setAccountInformation (accountInformation) {
	return {
		type: 'SET_ACCOUNT_INFORMATION',
		accountInformation
	}
}

export function setShippingInformation (shippingInformation) {
	return {
		type: 'SET_SHIPPING_INFORMATION',
		shippingInformation
	}
}

export function setShippingRates (rates) {
	return {
		type: 'SET_SHIPPING_RATES',
		rates
	}
}

export function setTaxRate (taxRate) {
	return {
		type: 'SET_TAX_RATE',
		taxRate
	}
}