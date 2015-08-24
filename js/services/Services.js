(function() {

    angular.module('Sapp')
        .factory('StockListService', ['$resource', function($resource) {

    console.log("Using StockListService");

    return $resource(
'https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?column=4&trim_start=2015-08-17&trim_end=2015-08-21&auth_token=kA5hVpUMRoQmJyRqFPvk',
            { },
            {
                query: {
                    method:'GET',
                    params: {},
                    isArray:false
                }
            }
        );
    }])

    .factory('WeatherService', ['$resource', function($resource) {

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
