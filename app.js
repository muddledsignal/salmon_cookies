'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

var allStores = [];

var addStoreForm = document.getElementById('addStoreForm');

// =========================Constructor Function=========================
function Store(locationName, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer) {

  this.locationName = locationName;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;

  this.customersEachHour = [];
  this.cookiesSoldEachHour = [];
  this.totalDailyCookieSales = 0;

  allStores.push(this);
};
// =========================End Constructor Function=========================



// =========================Prototype Methods=========================
Store.prototype.calcCustomersEachHour = function () {
  // console.log(this.maxCustomersPerHour, 'checking input values') // test to debug if math not working
  for (var i = 0; i < hours.length; i++) {
    //calc random number between min/max and put into the array
    var newRandom = random(this.minCustomersPerHour, this.maxCustomersPerHour);
    this.customersEachHour.push(random(this.minCustomersPerHour, this.maxCustomersPerHour));
    // console.log(this.customersEachHour);
  }
};

Store.prototype.calcCookiesSoldEachHour = function () {
  this.calcCustomersEachHour();
  // multiply our random customers by the average cookies per customer
  for (var i in hours) {
      this.cookiesSoldEachHour.push(Math.ceil(this.customersEachHour[i] * this.avgCookiesPerCustomer));
    
    this.totalDailyCookieSales = this.totalDailyCookieSales + this.cookiesSoldEachHour[i];
    // console.log(this.totalDailyCookieSales)
  }
};

// render hours
function renderAllHours() {
  var tableRow = document.createElement('tr');
  var tableHeader = document.createElement('th');
  tableHeader.textContent = 'Locations';
  tableRow.appendChild(tableHeader);

  for (var i = 0; i < hours.length; i++) {

    // create th
    var tableHeader = document.createElement('th');
    // give th content (each hour)
    tableHeader.textContent = hours[i];
    // append the th to the tr
    tableRow.appendChild(tableHeader);
    
  }
  storeSalesTable.appendChild(tableRow);

  var tableRow = document.createElement('th');
  tableRow.textContent = 'Daily Location Totals';
  tableRow.appendChild(tableHeader);
  
}

// render store
Store.prototype.render = function () {
  this.calcCookiesSoldEachHour();
  
  var tableElement = document.getElementById('stores');
  var tableRow = document.createElement('tr');
  var tableData = document.createElement('td');

  tableData.textContent = this.locationName;
  tableRow.append(tableData);
  
  for (var i in hours) {
    tableData = document.createElement('td');
    tableData.textContent = this.cookiesSoldEachHour[i];
    
    tableRow.append(tableData);
  }
  
  tableData = document.createElement('td');
  tableData.textContent = this.totalDailyCookieSales;
  tableRow.append(tableData);
  
  tableElement.append(tableRow);
};

function renderAllStores() {
  var tableElement = document.getElementById('stores');
  var tableRow = document.createElement('tr');
  
  
  // =========================Build Header Row=========================
  
  var storeLocationsTableData = document.createElement('td');
  
  storeLocationsTableData.textContent = 'Store Location';
  tableRow.append(storeLocationsTableData);
  
  for (var j in hours) {
    var tableData = document.createElement('td');
    tableData.textContent = hours[j];
    
    tableRow.append(tableData);
  }
  
  var storeTotalsTableData = document.createElement('td');
  storeTotalsTableData.textContent = 'Total Cookies Sold Per Day';
  tableRow.append(storeTotalsTableData);
  
  tableElement.append(tableRow);
  // =========================End Build Header Row=========================
  
  for (var i in allStores) {
    allStores[i].render();
  }
  
}

// new stores
var pikePlaceMarket = new Store('Pike Place Market', 23, 65, 6.3);
var seatacAirport = new Store('SeaTacAirport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);


// ==================================================




function handleAddNewStore(event) {
  
  event.preventDefault();
  
  var locationName = event.target.locationName.value;
  var minCustomersPerHour = event.target.minCustomersPerHour.value;
  var maxCustomersPerHour = event.target.maxCustomersPerHour.value;
  var avgCookiesPerCustomer = event.target.avgCookiesPerCustomer.value;
  
  var newFormStore = new Store(locationName, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerCustomer);
  renderAllStores();
  
  event.target.locationName.value = null;
  event.target.minCustomersPerHour.value = null;
  event.target.maxCustomersPerHour.value = null;
  event.target.avgCookiesPerCustomer.value = null;
  
  allStores.unshift(newFormStore);

  document.getElementById(stores).innerHTML = '';
}

addStoreForm.addEventListener('submit', handleAddNewStore);
// =========================================================

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // via MDN
};

renderAllStores();