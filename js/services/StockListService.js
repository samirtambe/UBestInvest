(function() {

    angular.module('Sapp').factory('StockListService', ['$resource', function($resource) {

    console.log("Using StockListService");

    return $resource(
'https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?auth_token=kA5hVpUMRoQmJyRqFPvk',
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
