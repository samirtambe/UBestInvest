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
                    column_index: '1', // The '1'st column which is called 'Index Value'
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








angular.module('UBestInvest').service('DateSvc', [function() {

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




angular.module('UBestInvest').service('GraphSvc', [function() {

    function createGraph(graphType, grData) {

        // DIV of class 'frontChartDiv' is used by the stockGraph directive
        // directives.js - template: <div class="frontChartDiv"></div>
        var indexGraphDivs = document.getElementsByClassName('frontChartDiv'),

        // The individual one selected based on the arguments of the specs in
        // graphtype attribute for stockgraph directive
            idxGrphDiv = '',

            parentDiv = document.getElementById('stockChartDiv'),

            childSVG = undefined,

            displayUnit = undefined;


        switch (graphType) {

            case 'dowjones':
                idxGrphDiv = indexGraphDivs[0];
                idxGrphDiv.id = 'frontMktDowJonesDiv';
                displayUnit = 'pts';
                break;

            case 'nasdaq':
                idxGrphDiv = indexGraphDivs[1];
                idxGrphDiv.id = 'frontMktNasdaqDiv';
                displayUnit = 'pts';
                break;

            case 'sp500':
                idxGrphDiv = indexGraphDivs[2];
                idxGrphDiv.id = 'frontMktSP500Div';
                displayUnit = 'pts';
                break;

            case 'stocks':
                idxGrphDiv = document.getElementById('stockChartDiv');
                displayUnit = '$ US';
                break;
        }


        var wide = idxGrphDiv.scrollWidth,

            tall = idxGrphDiv.scrollHeight,


            margin = { top: 10, right: 10, bottom: 80, left: 55 },


            width = 420 - margin.left - margin.right,


            height = 220 - margin.top - margin.bottom,


            parseDate = d3.time.format("%Y-%m-%d").parse,


            // Create x-axis scale
            x = d3.time.scale().range([0, width]),


            // Create y-axis scale
            y = d3.scale.linear().range([height, 0]),


            // Orient x-axis
            xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5),


            // Orient y-axis
            yAxis = d3.svg.axis().scale(y).orient("left").ticks(5),


            area = d3.svg.area().x(function(d) {

               return x(d.date);

            }).y0(height).y1(function(d) {

               return y(d.close);
            }),

            svg = d3.select('#'+idxGrphDiv.id);
console.log('idxGrphDiv.id = ' + idxGrphDiv.id);
        if (graphType == 'stocks') {
            svg.append("svg")
                .attr("id","theSVG")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        } else {
            svg.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        var data = [];
//            }),

//            svg = d3.select('#'+idxGrphDiv.id)
//            .append("svg")
//            .attr("width", width + margin.left + margin.right)
//            .attr("height", height + margin.top + margin.bottom)
//            .append("g")
//            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
//
//            data = [];

// CONVERT AN LONG ARRAY OF ARRAYS into an array of objects

        for (var cat = 0; cat < grData.length; cat++) {

                data.unshift({ date: grData[cat][0], close: grData[cat][1] });
            }

        data.forEach(function(pair) {

           pair.date = parseDate(pair.date);

           pair.close = +pair.close;

        });

        x.domain(d3.extent(data, function(d) {

           return d.date;
        } ) );


        y.domain([   d3.min(data,  function(d) { return d.close; } )
           ,
           d3.max(data, function(d) {return d.close; } )
        ]);

        svg.append("path")
           .datum(data)
           .attr("class", "area")
           .attr("d", area);

        // Drawing x-axis
        svg.append("g")
           .attr("class","x axis")
           .attr("transform","translate(0,"+height+")")
           .call(xAxis)
           .selectAll("text")
           .style("text-anchor", "end")
           .attr("dx", "-.8em")
           .attr("dy", ".15em")
           .attr("transform", function(d) {
                return "rotate(-45)";
        });

        // Drawing y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(displayUnit);

        return svg;
    }

    return {
        createGraph: createGraph
    };
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
            , fps: 20 // Frames per second when use setTimeout() asfallback for CSS
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
