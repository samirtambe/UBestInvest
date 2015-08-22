(function(){
    angular.module('Sapp')
        .controller('EntryController', ['$scope','$firebaseArray',
                                        function($scope, $firebaseArray) {

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

    }]); // Controller

}()); // IFFE
