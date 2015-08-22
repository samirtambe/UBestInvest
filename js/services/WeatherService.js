(function() {

    angular.module('Sapp').factory('WeatherService', ['$resource', function($resource) {

        console.log("Using WeatherService");

        return $resource(
'http://api.wunderground.com/api/6e5628e3bc5762cf/geolookup/conditions/q/NJ/Metuchen.json',
            { },
            {
                query: {
                    method:'GET',
                    params: {},
                    isArray:false
                }
            }
        );
    }]);
}());
