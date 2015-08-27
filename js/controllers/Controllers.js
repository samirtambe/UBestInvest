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

        var ssl = StockListService.get({ data: 'data'}, function() {
            console.log("1..");
            console.log(ssl);
        });
        var ssls = StockListService.query(function() {
            console.log("2..");
            console.log(ssls.data[0]);
        });
        $scope.ssl = new StockListService(); // instantiate resource class
        $scope.ssl.data='some data';

        $scope.myStocks = ['T','MO','VZ','PRGO','BMY','AOS','AGN'];

        console.log("StockListController Created");
    }])



    .controller('WeatherController', ['$scope', 'WeatherService',
        function($scope, WeatherService) {

        $scope.weather = WeatherService.query();

        console.log("WeatherController Created");

    }]);
}()); // IFFE
