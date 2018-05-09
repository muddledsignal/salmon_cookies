'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

var allStores = [];

var storeSalesTable = document.getElementById('stores');

// var tableArray = [hours, allStores];

function Store (locationName, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer) {
  this.locationName = locationName;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.customersEachHour = [];
  this.cookiesSoldEachHour = [];
  this.totalDailyCookieSales = 0;
  allStores.push(this);
};



function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // via MDN
};


Store.prototype.calcCustomersEachHour = function() {
  // console.log(this.maxCustomersPerHour, 'checking input values') // test to debug if math not working
  for (var i = 0; i < hours.length; i++) {
    //calc random number between min/max and put into the array
    this.customersEachHour.push(random(this.minCustomersPerHour, this.maxCustomersPerHour));
    // console.log(this.customersEachHour);
  }
};

Store.prototype.calcCookiesSoldEachHour = function() {
  this.calcCustomersEachHour();
  // multiply our random customers by the average cookies per customer
  for (var i = 0; i < hours.length; i++) {
    this.cookiesSoldEachHour.push(Math.ceil(this.customersEachHour[i] * this.avgCookiesPerCustomer));
    this.totalDailyCookieSales = this.totalDailyCookieSales + this.cookiesSoldEachHour[i];
    // console.log(this.totalDailyCookieSales)
  }
};

// ============================================================================
function renderAllHours() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Locations';
  trEl.appendChild(thEl);

  for(var i = 0; i < hours.length; i++) {
    
    // create th
    var thEl = document.createElement('th');
    // give th content (each hour)
    thEl.textContent = hours[i];
    // append the th to the tr
    trEl.appendChild(thEl);
  
  }
  var trEl = document.createElement('th');
  trEl.textContent = 'Daily Location Totals';
  trEl.appendChild(thEl);

  storeSalesTable.appendChild(trEl);
}
// =============================================================================

Store.prototype.render = function() {
  
  this.calcCookiesSoldEachHour();
  // create tr
  var trEl = document.createElement('tr');
  
  // create td
  var tdEl = document.createElement('td');
  // give td content (Name for individual location)
  tdEl.textContent = this.locationName;
  // append the td to the tr
  trEl.appendChild(tdEl);

  for (var i = 0; i < )


  
  // // create td
  // tdEl = document.createElement('td');
  // // give td content (Minimum customers per hour)
  // tdEl.textContent = this.minCustomersPerHour;
  // // append the td to the tr
  // trEl.appendChild(tdEl);

  // // create td
  // tdEl = document.createElement('td');
  // // give td content (Maximum customers per hour)
  // tdEl.textContent = this.maxCustomersPerHour;
  // // append the td to the tr
  // trEl.appendChild(tdEl);

  // // create td
  // tdEl = document.createElement('td');
  // // give td content (Average cookies per customer)
  // tdEl.textContent = this.avgCookiesPerCustomer;
  // // append the td to the tr
  // trEl.appendChild(tdEl);

  // // create td
  // tdEl = document.createElement('td');
  // // give td content (customersEachHour)
  // tdEl.textContent = this.customersEachHour;
  // // append the td to the tr
  // trEl.appendChild(tdEl);

  // // create td
  // tdEl = document.createElement('td');
  // // give td content (cookiesSoldEachHour)
  // tdEl.textContent = this.cookiesSoldEachHour;
  // // append the td to the tr
  // trEl.appendChild(tdEl);

  // create td
  tdEl = document.createElement('td');
  // give td content (totalDailyCookieSales)
  tdEl.textContent = this.totalDailyCookieSales;
  // append the td to the tr
  trEl.appendChild(tdEl);
}


var pikePlaceMarket = new Store('Pike Place Market', 23, 65, 6.3);
var seatacAirport = new Store('SeaTacAirport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);




function renderAllStores() {
  for (var i in allStores) {
    allStores[i].render();
  }
};

renderAllHours();
// renderAllStores();

console.table(allStores);