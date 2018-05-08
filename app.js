'use strict';

// var salmonCookieStores = ['fist and Pike', 'Seatac Airport', 'Seattle Center', 'Capitol Hill', 'Alki'];

// firstAndPike.custPerHour = function(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// for (var i = 0; i < operationHours.length -1; i++) {
//     var hours = operationHours[i];
//     var message = ': ';
//     var cookiesPerHour = function(custPerHour, avgCookies) {
//         var multiplied = custPerHour * avgCookies;   
//     };

// };

// var calcCust = function() {
//     for (var i = 0; i < operationHours.length -1; i++) {
//     var calc = Math.floor(Math.random() * (firstAndPike.maxCust - firstAndPike.minCust + 1)) + minCust;
//     this.custPerHour.push(calc);
//     }
// };

// console.log(firstAndPike);
// console.log(firstAndPike.custPerHour);
// console.log(calc);

var operationHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];


var firstAndPike = {
    name: 'first and pike', 
    minCust: 23,
    maxCust: 65,
    avgCookies: 6.3,
    custPerHour: [],
    cookiesPerHour: [],
    calcCustEachHour: function() {
      return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;   
    },
    calcCustPerHour: function() {
      for (var i = 0; i < operationHours.length; i++) {
        this.custPerHour.push(this.calcCustEachHour());
      };
    },
    calcCookiesEachHour: function() {
      for (var i = 0; i < operationHours.length; i++) {
        this.cookiesPerHour[i] = this.custPerHour[i] * this.avgCookies;
      }
    },
    
    calcCookiesPerHour: function() {
      for (var i = 0; i < operationHours.length; i++) {
        this.custPerHour * this.avgCookies;  
        this.cookiesPerHour.push(this.calcCookiesEachHour());
      };
    },
    render: function() {
      this.calcCustPerHour();
      for (i = 0; i < operationHours.length; i++) {
        var message = operationHours[i] + ': ' + this.cookiesPerHour[i];
        console.log(message);
      };
    }
};

firstAndPike.render();
console.log(firstAndPike);



