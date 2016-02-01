angular.module('UBestInvest').filter('startFrom', function() {

    return function(input, start) {
console.log("input.length = "+input.length);
        start = +start; //parse to int
        console.log("start = "+start);
        return input.slice(start);
    }
});
