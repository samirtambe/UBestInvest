angular.module('UBestInvest').service('HttpSvc', ['$http', '$q', function($http, $q) {
/*
    When adding functionality:
        1) ADD additional variables
        2) ADD API Keys
        3) ADD URLs
        4) ADD to params switch
        5) ADD to return data switch
        6) ADD to wrapper function

*/
    function getData(reqType, parm) {
/* * * * * * * * * * * * * * * * VARIABLES * * * * * * * * * * * * * * * * * * * * * * * * * * */
        var format = '.json',

            StockColumnNum = '4',
/* * * * * * * * * * * * * * * * API KEYS OBJECT * * * * * * * * * * * * * * * * * * * * * * * */
            apiKeys = {
                quandl: 'kA5hVpUMRoQmJyRqFPvk',

                wunderground: '6e5628e3bc5762cf'
            },
/* * * * * * * * * * * * * * * * URLS OBJECT * * * * * * * * * * * * * * * * * * * * * * * */
            urls = {
                stock: 'https://www.quandl.com/api/v3/datasets/WIKI/',

                dowjones: 'https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_DJI.json',

                sp500: 'https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_GSPC.json',

                weather: 'http://api.wunderground.com/api/'
            },

            httpObj = { method: 'GET', url: '', params: {} };
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * PARAMS SWITCH * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        switch(reqType) {

            case 'news':
                break;

            case 'stock':
                httpObj.url = urls.stock + parm.symbol + format;
                httpObj.params = {
                    auth_token: apiKeys.quandl,
                    column_index: StockColumnNum,
                    trim_end: parm.startDate,
                    trim_start: parm.endDate
                };
                break;


            case 'dowjones':
                httpObj.url = urls.dowjones;
                httpObj.params = {
                    auth_token: apiKeys.quandl,
                    column_index: StockColumnNum,
                    trim_end: parm.startDate,
                    trim_start: parm.endDate
                };
                break;


            case 'sp500':
                httpObj.url = urls.sp500;
                httpObj.params = {
                    auth_token: apiKeys.quandl,
                    column_index: StockColumnNum,
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

/* * * * * * CALLBACK FOR SUCCESS * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
            function(response) {

                var retObj;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * RETURN DATA SWITCH * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

                switch (reqType) {

                    case 'news':
                        retObj = response.data;
                        break;

                    case 'stock':
                        retObj = response.data.dataset;
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
/* * * * * * CALLBACK FOR FAILURE * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* The API response from the server should be returned in a
normalized format. However, if the request was not handled by the
server (or what not handles properly - ex. server error), then we
may have to normalize it on our end, as best we can. */

            function(response) {
                if (response.status == '400' &&
                    response.data.quandl_error.code == 'QECx01') {

                    console.log("HttpSvc - " + response.data.quandl_error.message);

                    return($q.reject("Perhaps you forgot to enter the stock symbol."));
                }
                else if (response.status == '404' &&
                         response.data.quandl_error.code == 'QECx02') {

                    console.log( "HttpSvc - " + response.data.quandl_error.message);

                    return($q.reject("Unable to find symbol."));

                }
                else if (!angular.isObject(response.data ) ||
                         !response.data.message) {
                    return( $q.reject( "HttpSvc - An unknown error occurred." ) );
                }

                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            });//THEN

        return (request);
    }//GET DATA
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * WRAPPER FUNCTIONS * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
angular.module('UBestInvest').service('ChartSvc', [function() {

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
