(function() {

    angular.module('Sapp')
        .factory('StockListService', [
        '$resource', function($resource) {

            return function(params) {

                console.log("Using StockListService");

                var symbol = datatype = '.json?',
                    columns = 'column=4',
                    API_KEY = '&auth_token=kA5hVpUMRoQmJyRqFPvk';

            return $resource(
                'https://www.quandl.com/api/v1/datasets/WIKI/' +
                params.investment.invSymbol + //investment symbol
                datatype +
                columns +
                '&trim_start=' + params.endDate +
                '&trim_end=' + params.startDate +
                API_KEY,
                { },
                { query: {
                    method:'GET',
                    params: {},
                    isArray:false }
                });
            };//return function
    }])

    .factory('WeatherService', ['$resource', function($resource) {

        return function(params) {

            var API_KEY = '6e5628e3bc5762cf';

            console.log("Using WeatherService...");

            return $resource(
                'http://api.wunderground.com/api/' +
                API_KEY +
                '/conditions/q/' +
                params.selectedLocation.stateCityStr +
                '.json',
                { },
                {
                    query: { method:'GET', params: {}, isArray:false }
                });

        };// return function
    }]);
}());
