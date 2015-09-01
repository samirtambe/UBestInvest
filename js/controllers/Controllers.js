(function(){

    angular.module('Sapp')
    .controller('StockListController',
                ['$scope', 'StockListService', function($scope, StockListService) {

        //$scope.graphData = [];

        var ctr,
            len,
            opt,
            datalist = document.getElementById('investData');

        $scope.myStocks = ['T','MO','VZ','PRGO','BMY','AOS','AGN'];

        for (ctr = 0, len = $scope.myStocks.length; ctr < len; ctr++) {
            opt = document.createElement('option')
            opt.value = $scope.myStocks[ctr];
            datalist.appendChild(opt);
        }

        $scope.graphData = StockListService.query();

        console.log('>>'+$scope.graphData.length);


        console.log("StockListController Created");
    }])

    .controller('WeatherController',
                ['$scope', 'WeatherService', function($scope, WeatherService) {

        $scope.weather = WeatherService.query();

        console.log("WeatherController Created");

    }]);
}()); // IFFE
