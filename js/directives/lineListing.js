(function(){
    angular.module('Sapp').directive('lineListing', function () {
        console.log("lineListing.js");
        return {
            restrict: 'E',
            scope: {
                biz: '='
            },
            templateUrl: 'views/line-listing.html'
        };
    });
});
