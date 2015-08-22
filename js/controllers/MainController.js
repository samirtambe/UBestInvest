(function(){
    angular.module('Sapp')
        .controller('MainController', ['$scope','$firebaseArray',
                                       function($scope, $firebaseArray) {

        // Creating a snapshot of our data
        var ref = new Firebase('https://metuchenportal.firebaseio.com/Businesses');

        // Returning a synchronized array
        $scope.orgs = $firebaseArray(ref);

        console.log("MainController Created");

    }]); // Controller

}()); // IFFE
