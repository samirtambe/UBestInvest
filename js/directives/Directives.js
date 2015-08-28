(function() {
    angular.module('Sapp').directive('stockListing', function () {
        console.log("stockListing.js");
        return {
            restrict: 'E',
            scope: {
                biz: '='
            },
            templateUrl: 'views/stock-listing.html'
        };
    });
});
