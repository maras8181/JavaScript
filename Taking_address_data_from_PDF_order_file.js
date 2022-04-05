var delivery_address = data.extract(41.317333,105.664,0.0,13.208008,"<br />").trim();
delivery_address = delivery_address.split("<br />");

var name = "";
var street = "";
var postal = "";
var city = "";
var pos = 0;
var address_data = [];

var check_address = true;

try {
	for (var i = 0; i < delivery_address.length; i++){
		if (delivery_address[i] == ""){
			continue;
		} else {
			address_data.push(delivery_address[i]);
		}
	}

	for (var j = 0; j < address_data.length; j++){
		if (address_data[j].match(/\d{4}\s{1,}[A-Z]{2}|\d{4}[A-Z]{2}/g)){
			pos = j;
			break;
		}
	}
	name = address_data[0];
	street = address_data[pos-1];
	postal = address_data[pos].match(/\d{4}\s{1,}[A-Z]{2}|\d{4}[A-Z]{2}/g)[0];
	if (postal.length == 6){
		postal = postal.slice(0,4) + " " + postal.slice(4,6);
	}
	city = address_data[pos].slice(postal.length, address_data[pos].length).trim();
}
catch (TypeError){
	check_address = false;
}