(function() {

    angular.module('Sapp')
        .factory('StockListSvc', [
        '$resource', function($resource) {

            return function(params) {

                var symbol = datatype = '.json?',
                    columns = 'column=4',
                    API_KEY = '&auth_token=kA5hVpUMRoQmJyRqFPvk',
                    qnStr = 'https://www.quandl.com/api/v1/datasets/WIKI/' +
                        params.investment.invSymbol + //investment symbol
                        datatype + columns +
                        '&trim_start=' + params.endDate +
                        '&trim_end=' + params.startDate +
                        API_KEY;

                //console.log(qnStr);

            return $resource(qnStr,
                { },
                { query: {
                    method:'GET',
                    params: {},
                    isArray:false }
                });
            };//return function
    }])

    .factory('WeatherSvc', ['$resource', function($resource) {

        return function(params) {

            var API_KEY = '6e5628e3bc5762cf',

            qryString = 'http://api.wunderground.com/api/' + API_KEY +
                params.forecastType + '/q/' +
                params.selectedLocation.stateCityStr + '.json';

            //console.log(qryString);

            return $resource(qryString,{ }, {
                query: { method:'GET', params: {}, isArray:false }
                });//resource
        };// return
    }]);
}());
