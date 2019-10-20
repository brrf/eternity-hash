
//take a stringified date and return a formatted: Month DD, YYYY
function formatDate(dateString) {
	const dateObject = new Date(dateString);
	const month = convertMonthToString(dateObject.getMonth());
	const day = dateObject.getDate();
	const year = dateObject.getFullYear();
	
	return `${month} ${day}, ${year}`
}

function convertMonthToString (month) {
	switch(month) {
		case 0: return "January"
		case 1: return "Feburary"
		case 2: return "March"
		case 3: return "April"
		case 4: return "May"
		case 5: return "June"
		case 6: return "July"
		case 7: return "August"
		case 8: return "September"
		case 9: return "October"
		case 10: return "November"
		case 11: return "December"
		default: return 
	}
}

module.exports = formatDate;