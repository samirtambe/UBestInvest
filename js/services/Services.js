angular.module('TambeTech').service('QuandlSvc', ['$http', '$q', function($http, $q) {

    return ({
        getQuandlData: getQuandlData
    });

    function getQuandlData(parm) {

        var datatype = '.json',
            cols = '4',
            QUANDL_API_KEY = 'kA5hVpUMRoQmJyRqFPvk',
            urlBase = 'https://www.quandl.com/api/v1/datasets/WIKI/' +
                        parm.investment.invSymbol + datatype,

            request = $http({ method: "GET", url: urlBase, params: {
                    auth_token: QUANDL_API_KEY,
                    column: cols,
                    trim_end: parm.startDate,
                    trim_start: parm.endDate
                }
            });

        return (request.then(handleSuccess, handleError));

    }

// PRIVATE METHODS.
// I transform error response, unwrapping the application data from API response payload.

    function handleError(response ) {
/*
The API response from the server should be returned in a
normalized format. However, if the request was not handled by the
server (or what not handles properly - ex. server error), then we
may have to normalize it on our end, as best we can.
*/
        if (!angular.isObject(response.data ) || !response.data.message) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return($q.reject(response.data.message));
    }

    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) { return(response.data.data); }


}]).factory('WeatherSvc', ['$resource', function($resource) {

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
