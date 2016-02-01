angular.module('UBestInvest').filter('startFrom', function() {

    return function(input, start) {
console.log("input = "+input);
        start = +start; //parse to int
        console.log("start = "+start);
        return input.slice(start);
    }
});
