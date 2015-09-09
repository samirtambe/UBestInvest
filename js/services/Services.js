(function() {

    angular.module('Sapp')
        .factory('StockListService', [
        '$resource', function($resource) {

            return function(params) {
                console.log("params.symbol > "+params.symbol);
                console.log("params.startDate > "+params.startDate);
                console.log("params.endDate > "+params.endDate);

            console.log("Using StockListService");

            var symbol = datatype = '.json?',
                columns = 'column=4',
//                beginDate = '&trim_start=2010-09-01',
//                endDate = '&trim_end=2015-08-27',
                API_KEY = '&auth_token=kA5hVpUMRoQmJyRqFPvk';

            return $resource(
                'https://www.quandl.com/api/v1/datasets/WIKI/' +
                params.symbol + //investment symbol
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
            }//return function
    }])

    .factory('WeatherService', ['$resource', function($resource) {

        console.log("Using WeatherService");

        return $resource(
'http://api.wunderground.com/api/6e5628e3bc5762cf/geolookup/conditions/q/NJ/Metuchen.json',
            { },
            { query: { method:'GET', params: {}, isArray:false } }
        );
    }]);
}());
