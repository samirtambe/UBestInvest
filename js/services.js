angular.module('UBestInvest').service('HttpSvc', ['$http', '$q', function($http, $q) {
/*
    When adding functionality:
        - Create unique return reference function to EXPOSE private function
          in final return
        - Create WRAPPER function with unique parameter to getData
        - Create a return data switch
        - ADD to URL PARAMETER CONSTRUCTION switch
        - ADD additional variables
        - ADD API Keys
        - ADD URLs to URLS object
        - ADD to callback for failure
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

                news: 'TBA',

                stock: 'https://www.quandl.com/api/v3/datasets/WIKI/',

                dowjones: 'https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_DJI.json',

                sp500: 'https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_GSPC.json',

                weather: 'http://api.wunderground.com/api/',

                nslist: 'http://ubestinvest.cardbycloud.com/rsc/nslist.json'
            },



/* * * * * * * * * * * * * * * * HTTP OBJECT * * * * * * * * * * * * * * * * * * * * * * * */
            httpObj = {
                method: 'GET',
                url: '',
                params: {}
            },



/* * * * * * * * * * * * * * * * ERROR OBJECT * * * * * * * * * * * * * * * * * * * * * * * */
            errorObject = {
                details: null,
                apiErrCode: null,
                apiErrMsg: null,
                httpStatus: null
            };




/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * URL PARAMETER CONSTRUCTION SWITCH * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        switch(reqType) {

            case 'news':
                break;

            case 'stock':
                httpObj.url = urls.stock + parm.pair.symbol + format;
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

            case 'nslist':
                httpObj.url = urls.nslist;
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

                    case 'nslist':
                        retObj = response.data.pairs;
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

                    errorObject.details = "Perhaps you forgot to enter the stock symbol.";
                    errorObject.apiErrCode = response.data.quandl_error.code;
                    errorObject.apiErrMsg = response.data.quandl_error.message;
                    errorObject.httpStatus = response.status;

                    return($q.reject(errorObject));
                }
                else if (response.status == '404' &&
                         response.data.quandl_error.code == 'QECx02') {

                    errorObject.details = "Unable to find symbol.";
                    errorObject.apiErrCode = response.data.quandl_error.code;
                    errorObject.apiErrMsg = response.data.quandl_error.message;
                    errorObject.httpStatus = response.status;

                    return($q.reject(errorObject));

                }
                else if (!angular.isObject(response.data ) ||
                         !response.data.message) {

                    errorObject.details = "An unknown error occurred.";
                    errorObject.apiErrCode = null;
                    errorObject.apiErrMsg = null;
                    errorObject.httpStatus = response.status;

                    return( $q.reject(errorObject) );
                }

                // Otherwise, use expected error message.
                errorObject.details = response.data.message;
                errorObject.apiErrCode = null;
                errorObject.apiErrMsg = null;
                errorObject.httpStatus = response.status;

                return($q.reject(errorObject));
            });//THEN

        return (request);
    }//GET DATA
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * WRAPPER FUNCTIONS * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    function getStockData (parm) {
        return getData('stock', parm);
    }

    function getDowJonesData (parm) {
        return getData('dowjones', parm);
    }

    function getSP500Data (parm) {
        return getData('sp500', parm);
    }

    function getWeatherData (parm) {
        return getData('weather', parm);
    }

    function getNewsData (parm) {
        return getData('news', parm);
    }

    function getSymbols(parm) {
        return getData('nslist', parm);
    }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * Unique return reference function to EXPOSE private function * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    return ({
        getDowJonesData: getDowJonesData,
        getNewsData: getNewsData,
        getSP500Data: getSP500Data,
        getStockData: getStockData,
        getSymbols: getSymbols,
        getWeatherData: getWeatherData
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

        var dur = scope.durations,retStartDate;
//console.log('cbd='+scope.reqParams.todayDate.getDate());
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

