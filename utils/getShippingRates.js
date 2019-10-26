async function getShippingRates(address, item) {
	let response = await fetch('http://localhost:5000/shippingrate', {
		method: 'POST',
		headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000"},
		body: JSON.stringify({...address, ...item})
	})
	let data = await response.json();
	return data.shipment.rates;
}

module.exports = getShippingRates;