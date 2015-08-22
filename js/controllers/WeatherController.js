(function() {

    angular.module('Sapp').controller('WeatherController', ['$scope', 'WeatherService',
        function($scope, WeatherService) {

        $scope.weather = WeatherService.query();

        console.log("WeatherController Created");

    }]); // Controller

}()); // IFFE
