
function calculateDate(date, timezone) {
	let offset;
	let dateObject = new Date(date);

	switch(timezone) {
		case "Pacific/Pago_Pago":
		case "Pacific/Pago_Pago":
			offset = -11;
			break;
		case "Pacific/Honolulu":
			offset = -10;
			break;
		case "America/Los_Angeles":
		case "America/Tijuana":
			offset = -8
			break
		case "America/Denver":
		case "America/Phoenix":
		case "America/Mazatlan":
			offset = -7;
			break;
		case "America/Chicago":
		case "America/Mexico_City":
		case "America/Regina":
		case "America/Guatemala":
			offset = -6;
			break;
		case "America/Bogota":
  		case "America/New_York":
  		case "America/Lima":
  			offset = -5;
  			break;
  		case "America/Caracas":
  			offset = -4.5;
  			break;
		 case "America/Halifax":
  		case "America/Guyana":
		case "America/La_Paz":
			offset = -4;
			break;
		case "America/Argentina/Buenos_Aires":
 		case "America/Godthab":
  		case "America/Montevideo":
		case "America/Santiago":
		  	offset = -3;
		  	break;
		case "America/St_Johns":
		  	offset = -3.5
		  	break;
		case "America/Sao_Paulo":
		case "Atlantic/South_Georgia":
		  	offset = -2;
		  	break;
		case "Atlantic/Azores":
		case "Atlantic/Cape_Verde":
		  	offset = -1;
		  	break;
		case "Africa/Casablanca":  
		case "Europe/Dublin":
		case "Europe/Lisbon":
		case "Europe/London":
		case "Africa/Monrovia":
			offset = 0;
			break;

		case "Africa/Algiers":
		case "Europe/Amsterdam":
		case "Europe/Berlin":
		case "Europe/Brussels":
		case "Europe/Budapest":
		case "Europe/Belgrade":
		case "Europe/Prague":
		case "Europe/Copenhagen":
		case "Europe/Madrid":
		case "Europe/Paris":
		case "Europe/Rome":
		case "Europe/Stockholm":
		case "Europe/Vienna":
		case "Europe/Warsaw":
			offset = 1;
			break;
		case "Europe/Athens":
		case "Europe/Bucharest":
		case "Africa/Cairo":
		case "Asia/Jerusalem":
		case "Africa/Johannesburg":
		case "Europe/Helsinki":
		case "Europe/Kiev":
		case "Europe/Kaliningrad":
		case "Europe/Riga":
		case "Europe/Sofia":
		case "Europe/Tallinn":
		case "Europe/Vilnius":
			offset = 2;
			break;
		case "Europe/Istanbul":
		case "Asia/Baghdad":
		case "Africa/Nairobi":
		case "Europe/Minsk":
		case "Asia/Riyadh":
		case "Europe/Moscow":
			offset = 3;
			break;
		case "Asia/Tehran":
			offset = 3.5;
			break;
		case "Asia/Baku":
		case "Europe/Samara":
		case "Asia/Tbilisi":
		case "Asia/Yerevan":
			offset = 4;
			break;
		case "Asia/Kabul":
			offset = 4.5;
			break;
		case "Asia/Karachi":
		case "Asia/Yekaterinburg":
		case "Asia/Tashkent":
			offset = 5;
			break;
		case "Asia/Colombo":
			offset = 5.5;
			break;
		case "Asia/Almaty":
		case "Asia/Dhaka":
			offset = 6;
			break;
		case "Asia/Rangoon":
			offset = 6.5;
			break;
		case "Asia/Bangkok":
		case "Asia/Jakarta":
		case "Asia/Krasnoyarsk":
			offset = 7;
			break;
		case "Asia/Shanghai":
		case "Asia/Hong_Kong":
		case "Asia/Kuala_Lumpur":
		case "Asia/Irkutsk":
		case "Asia/Singapore":
		case "Asia/Taipei":
		case "Asia/Ulaanbaatar":
		case "Australia/Perth":
			offset = 8;
			break;
		case "Asia/Yakutsk":
		case "Asia/Seoul":
		case "Asia/Tokyo":
			offset = 9;
			break;
		case "Australia/Darwin":
			offset = 9.5;
			break;
		case "Australia/Brisbane":
		case "Pacific/Guam":
		case "Asia/Magadan":
		case "Asia/Vladivostok":
		case "Pacific/Port_Moresby":
			offset = 10;
			break;
		case "Australia/Adelaide":
			offset = 10.5;
			break;
		case "Australia/Hobart":
		case "Australia/Sydney":
		case "Pacific/Guadalcanal":
		case "Pacific/Noumea":
			offset = 11;
			break;
		case "Pacific/Majuro":
		case "Asia/Kamchatka":
			offset = 12;
			break;
		case "Pacific/Auckland":
		case "Pacific/Fakaofo":
		case "Pacific/Fiji":
		case "Pacific/Tongatapu":
			offset = 13;
			break;
		case "Pacific/Apia":
			offset = 14;
			break;
		default:
			return;
	}
	offset *= 3600000
	return dateObject.getTime() + offset;
}

module.exports = calculateDate