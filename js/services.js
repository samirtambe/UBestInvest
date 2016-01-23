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

                nasdaq: 'https://www.quandl.com/api/v3/datasets/NASDAQOMX/COMP.json',

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

            case 'nasdaq':
                httpObj.url = urls.nasdaq;
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

                    case 'nasdaq': /* *** THIS MAY CHANGE *** */
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
    function getHomeGraphData (homeGraphType, parm) {

        switch (homeGraphType) {

            case 'dowjones':
                return getData('dowjones', parm);
                break;

            case 'nasdaq':
                return getData('nasdaq', parm);
                break;

            case 'sp500':
                return getData('sp500', parm);
                break;

        }//switch
    }//getHomeGraphData

    function getStockData (parm) {
        return getData('stock', parm);
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
        getHomeGraphData: getHomeGraphData,
        getNewsData: getNewsData,
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

angular.module('UBestInvest').service('SpinnerSvc', [function() {

    function getSpinner() {

        var opts = {
            lines: 11 // The number of lines to draw
            , length: 20 // The length of each line
            , width: 14 // The line thickness
            , radius: 40 // The radius of the inner circle
            , scale: 0.5 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.05 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        };

        var target = document.getElementById('theBodyTag');

        return new Spinner(opts).spin(target);

    }

    return {
        getSpinner: getSpinner
    };
}]);
