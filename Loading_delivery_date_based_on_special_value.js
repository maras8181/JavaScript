function checkDate(deliveryDate) {
switch (deliveryDate.getDay()) {
  // Check for Saturday
  case 6:
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    break;
  // Check for Sunday
  case 0:
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    break;
  default:
    break;
  }
  return deliveryDate;
}

var deliveryPeriod, dIter, departure = new Date(record.tables.detail[i].fields.ItemDepartureDate);
i++;
// '15' or 15 or '15d' to go through adding days algorithm
// '15m' to go through adding months algorithm
deliveryPeriod = record.fields.CommentDelivery; // delivery period taken from comment delivery field
deliveryPeriod = deliveryPeriod.toString();

var deliveryDate = new Date(departure);
deliveryDate = checkDate(deliveryDate);

// Case for day format
if (deliveryPeriod.endsWith('d') || !isNaN(deliveryPeriod)) {
  deliveryPeriod = parseInt(deliveryPeriod.replace('d', ''), 10);
  for (dIter = 0; dIter < deliveryPeriod; dIter++) {
    switch (deliveryDate.getDay()) {
    // Check for Friday
    case 5:
      deliveryDate.setDate(deliveryDate.getDate() + 3);
      break;
    default:
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      break;
    }
  }
} else if (deliveryPeriod.endsWith('m')) {
  deliveryPeriod = parseInt(deliveryPeriod.replace('m', ''), 10);
  deliveryDate.setMonth(deliveryDate.getMonth() + deliveryPeriod);
    deliveryDate = checkDate(deliveryDate);
} else {
  deliveryDate = 'Incorrect value of deliveryPeriod variable';
}
deliveryDate;