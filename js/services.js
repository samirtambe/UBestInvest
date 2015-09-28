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

            case 'news':
                break;

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

                    case 'news':
                        retObj = response.data;
                        break;

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
                    return( $q.reject( "HttpSvc - An unknown error occurred." ) );
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
    function getNewsData (parm) { return getData('news', parm); }


    return ({
        getStockData: getStockData,
        getDowJonesData: getDowJonesData,
        getSP500Data: getSP500Data,
        getWeatherData: getWeatherData,
        getNewsData: getNewsData
    });

}]);
/***********************************************************************************************/






/***********************************************************************************************/
angular.module('TambeTech').service('ChartSvc', [function() {

    function padWithZero(chk) {

        if (chk.length == 1) {
            return ('0' + chk);
        }

        else {
            return chk;
        }
    };

    function calcBeginDate(scope) {

        var dur = scope.durations,
            retStartDate;

        switch(scope.reqParams.duration) {

            case dur[0]:
                retStartDate = scope.reqParams.todayDate.getDate() - 7;

                break;

            case dur[1]:
                retStartDate = scope.reqParams.todayDate.getDate() - 31;
                break;

            case dur[2]:
                retStartDate = scope.reqParams.todayDate.getDate() - 93;
                break;

            case dur[3]:
                retStartDate = scope.reqParams.todayDate.getDate() - 186;
                break;

            case dur[4]:
                retStartDate = scope.reqParams.todayDate.getDate() - 366;
                break;

            case dur[5]:
                retStartDate = scope.reqParams.todayDate.getDate() - 1827;
                break;

            default:
                retStartDate = scope.reqParams.todayDate.getDate() - 7;
        }
        return retStartDate;
    }

    function formatDateShort(scope) {

        var shortDate = {
            start: '',
            end: ''
        };

         shortDate.start = scope.reqParams.todayDate.getFullYear() +
            '-' +
            padWithZero((scope.reqParams.todayDate.getMonth() + 1).toString()) +
            '-' +
            padWithZero(scope.reqParams.todayDate.getDate().toString());

         shortDate.end = scope.reqParams.howLongAgo.getFullYear() +
            '-' +
            padWithZero((scope.reqParams.howLongAgo.getMonth() + 1).toString()) +
            '-' +
            padWithZero(scope.reqParams.howLongAgo.getDate().toString());

        return shortDate;
    }

    return({
        calcBeginDate: calcBeginDate,
        formatDateShort: formatDateShort
    });
}]);
