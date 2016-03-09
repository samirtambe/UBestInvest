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
/* * * * * * * * * * * * * * * * VARIABLES * * * * * * * * * * * * * * * * * * * * * * * * */
        var format = '.json',

            StockColumnNum = '4',

/* * * * * * * * * * * * * * * * API KEYS OBJECT * * * * * * * * * * * * * * * * * * * * * */
            apiKeys = {
                quandl: 'kA5hVpUMRoQmJyRqFPvk',
                nytimes: '6d0f64d3e8a611c1e49bd563b2b84490:15:73885562'
            },
/* * * * * * * * * * * * * * * * URLS OBJECT * * * * * * * * * * * * * * * * * * * * * * * */
            urls = {

                newsNational:   'http://api.nytimes.com/svc/topstories/v1/national',

                newsWorld:      'http://api.nytimes.com/svc/topstories/v1/world',

                newsBusiness:   'http://api.nytimes.com/svc/topstories/v1/business',

                newsRealEstate: 'http://api.nytimes.com/svc/topstories/v1/realestate',

                newsTech:       'http://api.nytimes.com/svc/topstories/v1/technology',

                newsSports:     'http://api.nytimes.com/svc/topstories/v1/sports',

                stock: 'https://www.quandl.com/api/v3/datasets/WIKI/',

                dowjones: 'https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_DJI.json',

                nasdaq: 'https://www.quandl.com/api/v3/datasets/NASDAQOMX/COMP.json',

                sp500: 'https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_GSPC.json',

            },

/* * * * * * * * * * * * * * * * HTTP OBJECT * * * * * * * * * * * * * * * * * * * * * * * */

            httpObj = {
                method: 'GET',
                url: '',
                params: {}
            },

/* * * * * * * * * * * * * * * * ERROR OBJECT * * * * * * * * * * * * * * * * * * * * * * * */

            errorObject={
                details: null,
                apiErrCode: null,
                apiErrMsg: null,
                httpStatus: null
            };

/* * * * * * * * * * * * * * * * URL PARAMETER CONSTRUCTION SWITCH * * * * * * * * * * * * * */

        switch(reqType) {

            case 'newsNational':
                httpObj.url = urls.newsNational + format + "?api-key=" +apiKeys.nytimes;
                break;

            case 'newsWorld':
                httpObj.url = urls.newsWorld + format + "?api-key=" +apiKeys.nytimes;
                break;

            case 'newsBusiness':
                httpObj.url = urls.newsBusiness + format + "?api-key=" +apiKeys.nytimes;
                break;

            case 'newsRealEstate':
                httpObj.url = urls.newsRealEstate + format + "?api-key=" +apiKeys.nytimes;
                break;

            case 'newsTech':
                httpObj.url = urls.newsTech + format + "?api-key=" +apiKeys.nytimes;
                break;

            case 'newsSports':
                httpObj.url = urls.newsSports + format + "?api-key=" +apiKeys.nytimes;
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


            case 'vocab':

//                httpObj.url = urls.vocab;
                break;

        }//SWITCH



        var request = $http(httpObj).then(

/* * * * * * CALLBACK FOR SUCCESS * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
            function(response) {

                var retObj;

                switch (reqType) {

                    case 'newsNational':
                        retObj = response.data.results;
                        break;

                    case 'newsWorld':
                        retObj = response.data.results;
                        break;

                    case 'newsBusiness':
                        retObj = response.data.results;
                        break;

                    case 'newsRealEstate':
                        retObj = response.data.results;
                        break;

                    case 'newsTech':
                        retObj = response.data.results;
                        break;

                    case 'newsSports':
                        retObj = response.data.results;
                        break;

                    case 'stock':
                        retObj = response.data.dataset;
                        break;

                    case 'dowjones':
                        retObj = response.data.dataset.data;
                        break;

                    case 'nasdaq':
                        retObj = response.data.dataset.data;
                        break;

                    case 'sp500':
                        retObj = response.data.dataset.data;
                        break;

                    case 'vocab':

//                        retObj = response.data.dict;
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

                    errorObject.details = "Invalid Symbol or Unknown API Route.";
                    errorObject.apiErrCode = response.data.quandl_error.code;
                    errorObject.apiErrMsg = response.data.quandl_error.message;
                    errorObject.httpStatus = response.status;

                    return($q.reject(errorObject));
                }
                else if (response.status == '404' &&
                         response.data.quandl_error.code == 'QECx02') {

                    errorObject.details = "No Data for that symbol.";
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

/* * * * * * * * * * * * * * * * WRAPPER FUNCTIONS * * * * * * * * * * * * * * * * * * * * * */


    function getNewsGraphData (newsGraphType, parm) {
        return getData(newsGraphType, parm);
    }

    function getStockData(parm) {
        return getData('stock', parm);
    }

    function getNewsBusiness() {
        return getData('newsBusiness', null);
    }

    function getNews(newsType) {
        return getData(newsType, null);
    }

    function getVocab() {
        return getData('vocab', null)
    }

/* * * * * * * Unique return reference function to EXPOSE private function * * * * * * * * * */

    return ({
        getNewsGraphData: getNewsGraphData,
        getNewsBusiness: getNewsBusiness,
        getNews: getNews,
        getStockData: getStockData,
        getVocab: getVocab
    });

}]);





angular.module('UBestInvest').service('DateSvc', [function() {

    function padWithZero(chk) {

        if (chk.length == 1) { return ('0' + chk); }
        else { return chk; }
    };

    function calcBeginDate(scope) {

        var dur = scope.durations,
            oneDayMS = 24 * 60 * 60 * 1000,
            retStartDate = undefined;

/* Formula for calculating the beginning date of the viewing interval for closing
    price values
                    var now = new Date();
                    var d2= new Date(now.getTime() - (24*60*60*1000  *  NUM_OF_DAYS ));
*/
        switch(scope.reqParams.duration) {

            case dur[0]:
                retStartDate = new Date(scope.reqParams.todayDate.getTime() - (oneDayMS * 7));
                break;

            case dur[1]:
                retStartDate = new Date(scope.reqParams.todayDate.getTime() - (oneDayMS * 31));
                break;

            case dur[2]:
                retStartDate = new Date(scope.reqParams.todayDate.getTime() - (oneDayMS * 93));
                break;

            case dur[3]:
                retStartDate = new Date(scope.reqParams.todayDate.getTime() - (oneDayMS * 186));
                break;

            case dur[4]:
                retStartDate = new Date(scope.reqParams.todayDate.getTime() - (oneDayMS * 366));
                break;

            case dur[5]:
                retStartDate = new Date(scope.reqParams.todayDate.getTime() - (oneDayMS * 1827));
                break;

            default:
                retStartDate = new Date(scope.reqParams.todayDate.getTime() - (oneDayMS * 7));
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
            idxGrphDiv = undefined,

//            parentDiv = document.getElementById('stockChartDiv'),
//
//            childSVG = undefined,

            displayUnit = undefined,

            idSVG = undefined,

            lowestCloseValue = undefined,

            highestCloseValue = undefined,

            yLowGap = undefined,

            yHighGap = undefined;

        switch (graphType) {

            case 'dowjones':
                idxGrphDiv = indexGraphDivs[0];
                idxGrphDiv.id = 'idx' + graphType + 'Div';
                displayUnit = 'pts';
                idSVG = graphType+'SVG';
                break;

            case 'nasdaq':
                idxGrphDiv = indexGraphDivs[1];
                idxGrphDiv.id = 'idx' + graphType + 'Div';
                displayUnit = 'pts';
                idSVG = graphType+'SVG';
                break;

            case 'sp500':
                idxGrphDiv = indexGraphDivs[2];
                idxGrphDiv.id = 'idx' + graphType + 'Div';
                displayUnit = 'pts';
                idSVG = graphType+'SVG';
                break;

            case 'stocks':
                idxGrphDiv = document.getElementById('stockChartDiv');
                displayUnit = '$ US';
                idSVG = 'theSVG';
                break;
        }

        var wide = idxGrphDiv.scrollWidth, // preset by the CSS

            tall = idxGrphDiv.scrollHeight, // preset by the CSS

            margin = { top: 10, right: 10, bottom: 80, left: 55 },


            widthSVG = wide - margin.left - margin.right,


            heightSVG = tall - margin.top - margin.bottom,


            parseDate = d3.time.format("%Y-%m-%d").parse,


            // Create x-axis scale
            x = d3.time.scale().range([0, widthSVG]),


            // Create y-axis scale
            y = d3.scale.linear().range([heightSVG, 0]),


            // Orient x-axis
            xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5),


            // Orient y-axis
            yAxis = d3.svg.axis().scale(y).orient("left").ticks(5),


            area = d3.svg.area().x(function(d) {

               return x(d.date);

            }).y0(heightSVG).y1(function(d) {

               return y(d.close);
            }),

            svg = d3.select('#'+idxGrphDiv.id)
            .append("svg")
            .attr("id",idSVG)
            .attr("width", widthSVG + margin.left + margin.right) //
            .attr("height", heightSVG + margin.top + margin.bottom) //
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),

            data = [];

// CONVERT AN LONG ARRAY OF ARRAYS into an array of objects

        for (var cat = 0; cat < grData.length; cat++) {

                data.unshift({ date: grData[cat][0], close: grData[cat][1] });
            }

        data.forEach(function(pair) {

           pair.date = parseDate(pair.date);

           pair.close = +pair.close;

        });

// Set domain range of values for X-Axis
        x.domain(d3.extent(data, function(d) {  return d.date;  } ) );


// Find the lowest closing price from the data array
        lowestCloseValue = d3.min(data, function(d) { return d.close; } );


// Find the highest closing price from the data array
        highestCloseValue = d3.max(data, function(d) { return d.close; } );


        yLowGap = 0.05 * lowestCloseValue;


        yHighGap = 0.05 * highestCloseValue;


        y.domain([  lowestCloseValue - yLowGap,
                  highestCloseValue + yHighGap]);

        svg.append("path")
           .datum(data)
           .attr("class", "area")
           .attr("d", area);

        // Drawing x-axis
        svg.append("g")
           .attr("class","x axis")
           .attr("transform","translate(0,"+heightSVG+")")
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

    return { createGraph: createGraph };

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
