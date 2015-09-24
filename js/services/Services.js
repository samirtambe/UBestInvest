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
                url: qnStr
            });

        return (request.then(handleSuccess, handleError));

    }

// ---
// PRIVATE METHODS.
// ---
// I transform the error response, unwrapping the application dta from
// the API response payload.

    function handleError( response ) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.

        if (! angular.isObject( response.data ) || ! response.data.message) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }

    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
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

/*
    angular.module('cardbycloud')
        .controller('ContactCtrl',
                    ['$scope', '$http', 'FormPostSvc','$state',
                     function ($scope, $http, FormPostSvc, $state ) {

    $scope.data = {flname: '', email: '', phonenum: '', message: ''};

    $scope.submitForm = function(isValid) {
        if (isValid) {
            $http({method: 'POST',
                   url: 'msghandler.php',
                   transformRequest: FormPostSvc,
                   data: {
                       flname: $scope.data.flname,
                       email: $scope.data.email,
                       phonenum: $scope.data.phonenum,
                       message: $scope.data.message
                  }
                })
            .then(function (response) {
                console.log("THEN: " + response.data);

                var found = response.data.search(/sent/i);

                if (found > -1) {
                    $state.go('messagesuccess');
                } else {
                    $state.go('messageerror');
                }

                return response;

            },function (response) {

                console.log("CATCH: " +
                            response.data+' => '+
                            response.status + ' => '+
                            response.statusText);

                return response;
            });
        }//if
    };//function
}]);





    angular.module('cardbycloud').factory("FormPostSvc", function() {

// Prepare request data for the form POST.

        function transformRequest( data, getHeaders ) {

            var headers = getHeaders();

            headers['Content-Type'] = "application/x-www-form-urlencoded; charset=utf-8";

            return( serializeData( data ) );
        }

        // Return the factory value.
        return( transformRequest );


// PRIVATE METHODS.
// I serialize the given Object into a key-value pair string. This
// method expects an object and will default to the toString() method.

        function serializeData( data ) {

// If this is not an object, defer to native stringification.

            if (!angular.isObject(data)) {
                return( ( data == null ) ? "" : data.toString() );
            }

            var buffer = [];

            // Serialize each key in the object.
            for ( var name in data ) {

                if (!data.hasOwnProperty(name)) {
                    continue;
                }

                var value = data[ name ];

                buffer.push(encodeURIComponent( name ) + "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );
            }//for
            // Serialize the buffer and clean it up for transportation.
            var source = buffer.join( "&" ).replace( /%20/g, "+" );

            return(source);
        }//serialize data

    });//Factory module

}());

*/
