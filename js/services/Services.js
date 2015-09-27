angular.module('TambeTech').service('HttpSvc', ['$http', '$q', function($http, $q) {

    function getData(reqType, parm) {

        var format = '.json',

            StockColumnNum = '4',

            apiKeys = {
                quandl: 'kA5hVpUMRoQmJyRqFPvk',

                wunderground: '6e5628e3bc5762cf'
            },

            urls = {
                stock: 'https://www.quandl.com/api/v3/datasets/WIKI/',

                dowjones: 'https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_DJI.json',

                sp500: 'https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_GSPC.json',

                weather: 'http://api.wunderground.com/api/'
            },

            httpObj = { method: 'GET', url: '', params: {} };

        switch(reqType) {

            case 'stock':
                httpObj.url = urls.stock + parm.investment.invSymbol + format;
                httpObj.params = {
                    auth_token: apiKeys.quandl,
                    column: StockColumnNum,
                    trim_end: parm.startDate,
                    trim_start: parm.endDate
                };
                break;


            case 'dowjones':
                httpObj.url = urls.dowjones;
                httpObj.params = {
                    auth_token: apiKeys.quandl,
                    column: StockColumnNum,
                    trim_end: parm.startDate,
                    trim_start: parm.endDate
                };
                break;


            case 'sp500':
                httpObj.url = urls.sp500;
                httpObj.params = {
                    auth_token: apiKeys.quandl,
                    column: StockColumnNum,
                    trim_end: parm.startDate,
                    trim_start: parm.endDate
                };
                break;


            case 'weather':
                httpObj.url = urls.weather + apiKeys.wunderground + parm.forecastType +
                    '/q/' + parm.selectedLocation.stateCityStr + format;
                break;
        }//SWITCH


            request = $http(httpObj).then(

                // handles SUCCESS
                function(response) {

                    var retObj;

                    switch (reqType) {

                        case 'stock':
                            retObj = response.data.dataset.data;
                            break;

                        case 'dowjones':
                            retObj = response.data.dataset.data;
                            break;

                        case 'sp500':
                            retObj = response.data.dataset.data;
                            break;

                        case 'weather':
                            retObj = response.data;
                            break;
                    }

                    return(retObj);
            },
                // handles ERROR
/* The API response from the server should be returned in a
normalized format. However, if the request was not handled by the
server (or what not handles properly - ex. server error), then we
may have to normalize it on our end, as best we can. */

                function(response ) {

                    if (!angular.isObject(response.data ) ||
                        !response.data.message) {
                        return( $q.reject( "QuandlSvc - An unknown error occurred." ) );
                    }

// Otherwise, use expected error message.
                    return($q.reject(response.data.message));
                });//THEN

        return (request);
    }//GET DATA

    function getStockData (parm) { return getData('stock', parm); }
    function getDowJonesData (parm) { return getData('dowjones', parm); }
    function getSP500Data (parm) { return getData('sp500', parm); }
    function getWeatherData (parm) { return getData('weather', parm); }
    //function getNewsData (parm) { return getData('news', parm); }


    return ({
        getStockData: getStockData,
        getDowJonesData: getDowJonesData,
        getSP500Data: getSP500Data,
        getWeatherData: getWeatherData
        //,getNewsData: getNewsData
    });

}]);
