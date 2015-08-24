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
        $scope.stockInfoArray = [];

        //for (var i=0,len=$scope.myStocks.length; i < len; i++) {

            //if (noerrorsINretreival) {
                $scope.stockInfoArray.push(StockListService.query());
            //}
        //}

        console.log("StockListController Created");
        console.log("==>" + JQuery.parseJSON( $scope.stockInfoArray[0]));
    }])



    .controller('WeatherController', ['$scope', 'WeatherService',
        function($scope, WeatherService) {

        $scope.weather = WeatherService.query();

        console.log("WeatherController Created");

    }]);
}()); // IFFE
