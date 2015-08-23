(function(){
    angular.module('Sapp').directive('stockListing', function () {
        console.log("lineListing.js");
        return {
            restrict: 'E',
            scope: {
                biz: '='
            },
            templateUrl: 'views/stock-listing.html'
        };
    });
});
