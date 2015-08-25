(function() {

    angular.module('Sapp')
        .factory('StockListService', ['$resource', function($resource) {

            console.log("Using StockListService");

            var symbol = 'AAPL',
                datatype = '.json?',
                columns = 'column=4',
                beginDate = '&trim_start=2015-08-17',
                endDate = '&trim_end=2015-08-21',
                API_KEY = '&auth_token=kA5hVpUMRoQmJyRqFPvk';

            return $resource(
                'https://www.quandl.com/api/v1/datasets/WIKI/' +
                symbol +datatype + columns + beginDate + endDate + API_KEY,
            { },
            { query: { method:'GET', params: {}, isArray:false } }
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
