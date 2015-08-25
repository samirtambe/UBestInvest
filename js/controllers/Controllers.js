(function(){
    angular.module('Sapp')
        .controller('EntryController', ['$scope','$firebaseArray', function($scope, $firebaseArray) {

            $scope.entry = {};

            // Creating a snapshot of our data
            var ref = new Firebase('https://metuchenportal.firebaseio.com/Businesses');

            // Returning a synchronized array
            $scope.orgs = $firebaseArray(ref);

            $scope.addEntry = function() {

                //saving it to the database
                $scope.entry.state = "New Jersey";
                $scope.orgs.$add($scope.entry);

                // reset
                $scope.entry = {};
            };
        console.log("EntryController Created");
    }])


    .controller('MainController', ['$scope','$firebaseArray',
                                       function($scope, $firebaseArray) {

        // Creating a snapshot of our data
        var ref = new Firebase('https://metuchenportal.firebaseio.com/Businesses');

        // Returning a synchronized array
        $scope.orgs = $firebaseArray(ref);

        console.log("MainController Created");

    }])


    .controller('StockListController', ['$scope', 'StockListService', function($scope, StockListService) {

        $scope.myStocks = ['T','MO','VZ','PRGO','BMY','AOS','AGN'];

        //var slsvc = StockListService.get({});

        $scope.stockDetail = StockListService.query();
        console.log ("===>>");
        console.log($scope.stockDetail);



        $scope.stockDetail = new StockListService(); // instantiate resource class
        console.log ("=>");
        console.log($scope.stockDetail.data);



        console.log("StockListController Created");

    }])



    .controller('WeatherController', ['$scope', 'WeatherService',
        function($scope, WeatherService) {

        $scope.weather = WeatherService.query();

        console.log("WeatherController Created");

    }]);
}()); // IFFE
