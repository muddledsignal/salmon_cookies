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
  this.dailyCookieSales = 0;

  allStores.push(this);
};

// =========================End Constructor Function=========================



// =========================Prototype Methods=========================
Store.prototype.calcCustomersEachHour = function () {
  // console.log(this.maxCustomersPerHour, 'checking input values') // test to debug if math not working
  for (var i = 0; i < hours.length; i++) {
    //calc random number between min/max and put into the array
    // var newRandom = random(this.minCustomersPerHour, this.maxCustomersPerHour);
    this.customersEachHour.push(random(this.minCustomersPerHour, this.maxCustomersPerHour));
    // console.log(this.customersEachHour);
  }
};

Store.prototype.calcCookiesSoldEachHour = function () {
  this.calcCustomersEachHour();
  // multiply our random customers by the average cookies per customer
  for (var i in hours) {
    this.cookiesSoldEachHour.push(Math.ceil(this.customersEachHour[i] * this.avgCookiesPerCustomer));
    
    this.dailyCookieSales = this.dailyCookieSales + this.cookiesSoldEachHour[i];
    // console.log(this.dailyCookieSales)
  }
};

// render store
Store.prototype.render = function () {
  this.calcCookiesSoldEachHour();
  
  var tableElement = document.getElementById('stores');
  var tableRow = document.createElement('tr');
  var tableHeading = document.createElement('th');
  var tableData = document.createElement('td');
  
  tableData.textContent = this.locationName;
  tableRow.append(tableData);
  
  for (var i in hours) {
    tableData = document.createElement('td');
    tableData.textContent = this.cookiesSoldEachHour[i];
    
    
    tableRow.append(tableData);
  }
  
  tableData = document.createElement('td');
  tableData.textContent = this.dailyCookieSales;
  tableRow.append(tableData);

  tableElement.append(tableRow);
};

// ==================================================================

function renderAllStores() {
  var tableElement = document.getElementById('stores');
  var tableRow = document.createElement('tr');
  
  // ==================================================================
  
  
  
  
  // =========================Build Header Row=========================
  
  var storeLocationsTableHeading = document.createElement('th');
  
  storeLocationsTableHeading.textContent = 'Store Location';
  tableRow.append(storeLocationsTableHeading);
  
  for (var j in hours) {
    var tableHeading = document.createElement('th');
    tableHeading.textContent = hours[j];
    
    tableRow.append(tableHeading);
  }
  
  var storeTotalsTableHeading = document.createElement('th');
  storeTotalsTableHeading.textContent = 'Daily Total';
  tableRow.append(storeTotalsTableHeading);
  
  tableElement.append(tableRow);
  
  // =========================Render All Stores=========================
  
  for (var i in allStores) {
    allStores[i].render();
  }
  
  // ===============================Build Hourly Totals================================
  
  var allHourlyTotalsTableHeading = document.createElement('tr');
  
  var tableHeading = document.createElement('th');
  var tableRow = document.createElement('tr');
  tableHeading.textContent = 'Hourly Totals';
  tableRow.append(tableHeading);

  
  for (var i in hours) {
    var hourlytotals = 0;
    var tableHeading = document.createElement('th');
    for (var j = 0; j < allStores.length; j++) {
      hourlytotals = hourlytotals + allStores[j].cookiesSoldEachHour[i];
    }
    tableHeading.textContent = hourlytotals;
    tableRow.append(tableHeading);
  }
  
  
  allHourlyTotalsTableHeading = document.createElement('th');

  var totalDailyCookieSales = 0;
  for (var l in allStores) {
    totalDailyCookieSales = totalDailyCookieSales + allStores[l].dailyCookieSales;
    allHourlyTotalsTableHeading.textContent = totalDailyCookieSales;
  }
  tableRow.append(totalDailyCookieSales);
  
  
  tableElement.append(tableRow);

}
  


// =====================New Stores=================================
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