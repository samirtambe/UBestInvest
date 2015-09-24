angular.module('TambeTech').service('QuandlSvc', ['$http', '$q', function($http, $q) {

    return ({
        getQuandlData: getQuandlData
    });

    function getQuandlData(params) {

        var prefix = 'https://www.quandl.com/api/v1/datasets/WIKI/',
            datatype = '.json?',
            columns = 'column=4',
            API_KEY = '&auth_token=kA5hVpUMRoQmJyRqFPvk',
            qnStr = prefix +
                params.investment.invSymbol +
                datatype +

                columns +
                '&trim_start=' +
                params.endDate +
                '&trim_end=' +
                params.startDate +
                API_KEY,

            request = $http({
                method: "GET",
                url: qnStr,
                data: {}
            });

        return (request.then(handleSuccess, handleError));

    }

// PRIVATE METHODS.
// I transform the error response, unwrapping the application data from
// the API response payload.

    function handleError( response ) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.

        if (!angular.isObject( response.data ) || !response.data.message) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }

    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
        console.log("handleSuccess data length.. - " +response.length);
        return( response.data );
    }


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
