(function() {

    angular.module('Sapp').controller('StockListController', ['$scope', 'StockListService',
        function($scope, StockListService) {

        $scope.stocklist = StockListService.query();

        console.log("WeatherController Created");

    }]); // Controller

}()); // IFFE
