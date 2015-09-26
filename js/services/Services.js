angular.module('TambeTech').service('QuandlSvc', ['$http', '$q', function($http, $q) {

    return ({ getQuandlData: getQuandlData });

    function getQuandlData(parm) {

        var datatype = '.json',
            cols = '4',
            QUANDL_API_KEY = 'kA5hVpUMRoQmJyRqFPvk',
            urlBase = 'https://www.quandl.com/api/v3/datasets/WIKI/' +
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
            return( $q.reject( "QuandlSvc - An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return($q.reject(response.data.message));
    }

    // I transform the successful response, unwrapping the application data
    // from the API response payload.

    function handleSuccess(response) { return(response.data.dataset.data); }

}]);
/********************************************************************************************/
angular.module('TambeTech').service('WeatherSvc', ['$http', '$q', function($http, $q) {

    return ({ getWeatherData: getWeatherData });

    function getWeatherData(parm) {

        var datatype = '.json',
            WUNDERGROUND_API_KEY = '6e5628e3bc5762cf',
            urlBase = 'http://api.wunderground.com/api/' +
                    WUNDERGROUND_API_KEY +
                    parm.forecastType +
                    '/q/' +
                    parm.selectedLocation.stateCityStr +
                    datatype;

            request = $http({ method: "GET", url: urlBase, params: {}  });

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
            return( $q.reject( "WeatherSvc - An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return($q.reject(response.data.message));
    }

    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) { return(response.data); }
}]);
