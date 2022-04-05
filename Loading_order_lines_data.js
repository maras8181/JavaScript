var line = data.extract(0.50799996,297.01065,0.0,4.741333,"<br />").trim();
line = line.replace(/\s{2,}/g, ' ');
line = line.split(' ');

var quantity = "";
var leverdate = "";
var suplier = "";

for (var i = 0; i < line.length-1; i++){
	if (line[i].match(/\d{1,2}\/\d{1,2}\/\d{2,4}/g)){
		leverdate = line[i];
	}
}

for (var i = 0; i < line.length-1; i++){
	if (line[i].match(",00")){
		quantity = line[i];
		break;
	}
}

for (var i = 0; i < line.length-1; i++){
	line[i] = line[i].replace(/\./g,"");
	if (line[i].match(/\d{11}/g)){
		suplier = line[i];
		break;
	}
}

quantity = quantity.replace(/\,/g,"").replace(/\./g,"").replace("00","");