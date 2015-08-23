(function() {

    angular.module('Sapp').controller('StockListController', ['$scope', 'StockListService', function($scope, StockListService) {

        $scope.myStocks = ['T','MO','VZ','PRGO','BMY','AOS','AGN'];
        $scope.stockInfoArray = [];

        for (var i=0,len=$scope.myStocks.length; i < len; i++) {

            if (noerrorsINretreival) {
                $scope.stockInfoArray.push(StockListService.query());
            }
        }

        console.log("StockListController Created");

    }]); // Controller

}()); // IFFE
