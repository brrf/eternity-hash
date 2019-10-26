calculateTax = (state) => {
			if (state === 'IL') return 0.1025;
			else return 0;
}

module.exports = calculateTax;