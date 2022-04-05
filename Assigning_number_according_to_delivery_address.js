// INPUT DATA HERE
var addressLocation = data.extract(104.309326,172.04266,46.736,29.972,"<br />");

var DelPeriod;
var defaultPeriod = "3"; 								// Put here the defaultperiod, add "m" if period is in months ("2m")
var i = 0;												// Used as a counter in Delivery/Departure date scripts

//  fill in a period if different than then default. 

var P0120 = ""; 
var P0150 = ""; 
var P0185 = ""; 
var P1497 = "";
var P0170 = "";
var P0130 = "";



/*
* What to do in order for this script to work?
* 1. [ESSENTIAL] data.extract to 'extracted' variable
*
* 2. [ESSENTIAL] Fill 'shipping' variable with data
*
* 3. [OPTIONAL] Adjust match filter 'highNum' if needed
*
* 4. [ESSENTIAL] Call 'delivery'
* 		in PReS if function javascript is not equal to 1.0
*/

var delivery = 1.0;

function main() {
  // var extracted = 'CHRISTIAN MURAT - P238007<br />Téléphone: 0389092053<br />Zone de regroupement / Bâtiment : PEI 1<br />Point de chute / Bureau : 881125<br />Mulhouse Usine (DIR)<br />PSA PEUGEOT CITROEN<br />Réception centrale mag M7<br /> Route de Chalampé<br />68071 Mulhouse Cedex<br />France';
  var extracted = addressLocation;
  var shipping = [
    /*
    *  Add here new ship to address
    *  [SAP ID, ZIP, ship address], <-- do not put comma on last record
    * ----- EXAMPLE -----
    * ['0150', '5048 AW', 'Simon De Cockstraat 21, Tilburg 5048 AW'],
	* ['0150', '5048 AW', 'Laurent Janssensstraat 108, Tilburg 5048 AW'],
	* ['0185', '5048 AV', 'SWAARDVENSTRAAT 39-05, Tilburg 5048 AV'],
	* ['1497', '627 00', 'K Letišti 1825, Šlapanice 627 00']
    */
	['0130', '4704 RT', 'Tussenriemer 7, Roosendaal 4704 RT'],	
	['0120', '3641 RW', 'Grt Mijdrechtstraat 3641 RW'],
	['0150', '5048 AW', 'Simon De Cockstraat, Tilburg 5048 AW'],
	['0150', '5048 AW', 'Laurent Janssensstraat, Tilburg 5048 AW'],
	['0185', '5048 AV', 'SWAARDVENSTRAAT, Tilburg 5048 AV'],
	['0201', '5652 BA', 'Rooijakkersstraat, Eindhoven 5652 BA'],
	['0202', '9723 JA', 'KIELER BOCHT, Groningen 9723 JA'],
	['0203', '8912 AV', 'Zwettestraat 29, LEEUWARDEN 8912 AV'],
	['0204', '8447 GR', 'IT KYLBLOK, Heerenveen 8447 GR'],
	['0209', '6716 AA', 'Frankeneng, Ede 6716 AA'],
	['0212', '1014 AN', 'Contactweg, Amsterdam 1014 AN'],
	['0213', '2632 BB', 'Ambachtshof, NOOTDORP 2632 BB'],
	['0214', '3044 BA', 'SCHUTTEVAERWEG, Rotterdam 3044 BA'],
	['0216', '6412 ZL', 'Breukerweg, Heerlen 6412 ZL'],
	['0217', '7825 VZ', 'WILLEM BARENTSZSTRAAT, Emmen 7825 VZ'],
	['0220', '5015 BM', 'Jules Verneweg, Tilburg 5015 BM'],
	['0227', '6136 KT', 'Nusterweg, Sittard 6136 KT'],
	['0501_0551', '2630', 'DIJKSTRAAT, AARTSELAAR 2630'],
	['0600', '2300', 'MUIZENVENSTRAAT, Turnhout 2300'],
	['0601', '3500', 'Genkersteenweg, Hasselt 3500'],
	['0602', '2260', 'SNELWEGSTRAAT, Geel 2260'],
	['0603', '2030', 'NOORDERLAAN, Antwerpen 2030'],
	['0605', '8000', 'MONNIKENWERVE, Brugge 8000'],
	['0606', '9032', 'Industrieweg, Wondelgem 9032'],
	['0607', '8520', ' Brugsesteenweg, Kortrijk (Kuurne) 8520'],
	['0610', '1932', 'Leuvensesteenweg, Zaventem 1932'],
	['0611', '1610', 'P.BASTELEUSSTRAAT, ST. PIETERS-LEEUW 1610'],
	['0612', '6041', 'Chaussée de Fleurus, Gosselies 6041'],
	['0614', '4040', 'QUATRIEME AVENUE, Herstal 4040'],
	['0616', '3920', 'Lodewijk de Raetstraat, Lommel 3920'],
	['0618', '9800', 'KORTRIJKSESTEENWEG, Deinze 9800'],
	['0621', '8800', 'Brugsesteenweg, Roeselare 8800'],
	['0622', '9820', 'Hundelgemsesteenweg, Merelbeke 9820'],
	['1101', '59174', 'Rue Germaine Tillion, La sentinelle 59174'],
	['1204', '2840-068', 'R. Rodrigo Sarmento de Beires, Aldeia de Paio Pires 2840-068'],
	['1497', '664 51', 'K Letišti, Šlapanice 664 51'],
	['1701', '60-478', 'LUTYCKA, POZNAŃ 60-478'],
	['0170', 'shanghai', 'Fabory Shanghai, FASHA, Hongmei Road, Shanghai 200233'],
	['0150', 'rotterdam', 'Simon De Cockstraat, Tilburg 5048 AW'],
	['0234', '3542 AX', 'Otto Hahnweg, Utrecht 3542 AX']

  ];
  var counter = null;

  // -------------------------- Program Execution ------------------------------------
  formatInput();
  getShipAddress();
  getResult();

  // ------- Testing --------
  // console.log(shipping);
  // console.log(delivery);
  // console.log(extracted);
  // ************************
  // ********************************************************************************

  // format data.extract data to minimize unnecessary distinctness
  function formatInput() {
    extracted = extracted
      .replace(/<br\s\/>/g, ' ')
      .replace(/\s/g, ' ')
      .toLowerCase()
      .replace(/[+-/,\\.()]/g, ' ')
	  .replace(/\b[A-Za-z]{1,2}\b/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim()
      .split(' ');

    for (var i = 0; i < shipping.length; i += 1) {
      shipping[i][0] = shipping[i][0]
      .trim();

      shipping[i][1] = shipping[i][1]
        .toLowerCase()
        .replace(/[+-/,\\.()]/g, ' ')
		.replace(/\b[A-Za-z]{1,2}\b/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();

      shipping[i][2] = shipping[i][2]
        .toLowerCase()
        .replace(/[+-/,\\.()]/g, ' ')
		.replace(/\b[A-Za-z]{1,2}\b/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
    }
  }

  function getShipAddress() {
    // Looking if extracted = data.extract has PostCode we are looking for
    for (var n = 0; n < shipping.length; n += 1) {
      if (extracted.join('').match(shipping[n][1].replace(/\s/g, '')) !== null) {
        shipping[n].push(1);
        counter += 1;
      } else {
        shipping[n].push(null);
      }
    }

    // If our match is not unique, we try to match SAP number based on street information
    if (counter > 1) {
      var k = null;
      for (var i = 0; i < shipping.length; i += 1) {
        k = 0;
        if (shipping[i][3] === 1) {
          for (var c = 0; c < extracted.length; c += 1) {
            if (shipping[i][2].match(extracted[c]) !== null) {
              k += 1;
            }
          }
          shipping[i][3] = k;
        }
      }
    }
  }

  function getResult() {
    var highNum = 0;
    var index = null;

    // if unique, then assign to delivery, else find highest match in our addresses
    if (counter === 1) {
      for (var i = 0; i < shipping.length; i += 1) {
        if (shipping[i][3] === 1) {
          delivery = shipping[i][0];
          break;
        }
      }
    } else {
      for (var m = 0; m < shipping.length; m += 1) {
        if (highNum < shipping[m][3]) {
          highNum = shipping[m][3];
          index = m;
        }
      }

      // Before assigning, check if there is not 0, just here to mend null exception
      if (highNum > 0) {
        delivery = shipping[index][0];
      }
    }
  }
}

main();



// DelPeriod - DO NOT CHANGE!!

switch(delivery) {
		case "0130": if(P0130 == ""){
						DelPeriod = defaultPeriod;
					 }
					 else{DelPeriod = P0130;
					 } break;
		case "0120": if(P0120 == ""){
						DelPeriod = defaultPeriod;
					 } 
					 else{DelPeriod = P0120;
					 } break;
        case "0150": if(P0150 == ""){
						DelPeriod = defaultPeriod;
					 } 
					 else{DelPeriod = P0150;
					 } break;
        case "0185": if(P0185 == ""){
						DelPeriod = defaultPeriod;
					 } 
					 else{DelPeriod = P0185;
					 } break;
        case "0201": DelPeriod = defaultPeriod; break;
       	case "0202": DelPeriod = defaultPeriod; break; 
       	case "0204": DelPeriod = defaultPeriod; break; 
       	case "0209": DelPeriod = defaultPeriod; break; 
       	case "0212": DelPeriod = defaultPeriod; break; 
       	case "0213": DelPeriod = defaultPeriod; break; 
       	case "0214": DelPeriod = defaultPeriod; break; 
       	case "0216": DelPeriod = defaultPeriod; break; 
       	case "0217": DelPeriod = defaultPeriod; break; 
       	case "0220": DelPeriod = defaultPeriod; break; 
       	case "0227": DelPeriod = defaultPeriod; break; 
       	case "0501_0551": DelPeriod = defaultPeriod; break; 
       	case "0600": DelPeriod = defaultPeriod; break; 
       	case "0601": DelPeriod = defaultPeriod; break; 
       	case "0602": DelPeriod = defaultPeriod; break; 
       	case "0603": DelPeriod = defaultPeriod; break; 
       	case "0605": DelPeriod = defaultPeriod; break; 
       	case "0606": DelPeriod = defaultPeriod; break; 
       	case "0607": DelPeriod = defaultPeriod; break; 
       	case "0610": DelPeriod = defaultPeriod; break; 
       	case "0611": DelPeriod = defaultPeriod; break; 
       	case "0612": DelPeriod = defaultPeriod; break; 
       	case "0614": DelPeriod = defaultPeriod; break; 
       	case "0616": DelPeriod = defaultPeriod; break; 
       	case "0618": DelPeriod = defaultPeriod; break; 
       	case "0621": DelPeriod = defaultPeriod; break; 
       	case "0622": DelPeriod = defaultPeriod; break; 
       	case "1101": DelPeriod = defaultPeriod; break; 
       	case "1204": DelPeriod = defaultPeriod; break; 
       	case "1497": if(P1497 == ""){
						DelPeriod = defaultPeriod;
					 } 
					 else{DelPeriod = P1497;
					 } break;
       	case "1701": DelPeriod = defaultPeriod; break; 
		case "0170": if(P0170 == ""){
						DelPeriod = defaultPeriod;
					 } 
					 else{DelPeriod = P0170;
					 } break;
		default: DelPeriod = "ERROR: add new plant"; break;
}
