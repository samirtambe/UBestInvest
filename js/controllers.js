angular.module('UBestInvest').controller('ResearchCtrl',
    ['$scope', 'HttpSvc', 'ChartSvc', '$window', 'SpinnerSvc',
     function($scope, HttpSvc, ChartSvc, $window, SpinnerSvc) {

    $scope.showErrModal = false;

    $scope.errorModalDetails = undefined;

    $scope.pair = undefined;

    $scope.durations = ['1 Week','1 Month','3 Months','6 Months','1 Year','5 Years'];

    $scope.reqParams = {

        pair: {symbol : undefined, name : undefined },
        todayDate : new Date(),
        howLongAgo: new Date(),
        duration: $scope.durations[0],
        startDate: '',
        endDate: ''
    };


    $(".btn").mouseup(function() {
         $(this).blur();
    });

    $scope.reqParams.todayDate.setDate($scope.reqParams.todayDate.getDate() - 1);


    var createChart = function() {

        var stkChrtDiv = document.getElementById("stockChartDiv"),
            wide = stkChrtDiv.scrollWidth,
            tall = stkChrtDiv.scrollHeight;

        var margin = {
            top: 20,
            right: 20,
            bottom: 80,
            left: 50
        },
            width = wide - margin.left - margin.right,
            height = tall - margin.top - margin.bottom,

            parseDate = d3.time.format("%Y-%m-%d").parse,

            x = d3.time.scale().range([0, width]),

            y = d3.scale.linear().range([height, 0]),

            xAxis = d3.svg.axis().scale(x).orient("bottom"),

            yAxis = d3.svg.axis().scale(y).orient("left").innerTickSize(-width),

            area = d3.svg.area()
                .x(function(d) {
                    return x(d.date);

                }).y0(height)

                .y1(function(d) {
                    return y(d.close);
                }),

            svg = d3.select("#stockChartDiv")
                    .append("svg")
                    .attr("id","theSVG")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),


            data = [];

    // CONVERT AN LONG ARRAY OF ARRAYS into an array of objects

            for (var cat=0,leng = $scope.graphData.length; cat < leng; cat++) {
                data.unshift(
                    {
                        date: $scope.graphData[cat][0],
                        close: $scope.graphData[cat][1]
                    }
                );
            }

            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.close = +d.close;
            });

            x.domain(d3.extent(data, function(d) { return d.date; }));

            y.domain([0, d3.max(data, function(d) { return d.close; })]);

            svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function(d) {
                    return "rotate(-45)";
                    });


            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("U.S. Dollars");
        };

    $scope.getGraph = function(validForm) {

        if (validForm == true) {

            var spinner = SpinnerSvc.getSpinner();//starts spinning

            $scope.reqParams.howLongAgo.setDate(ChartSvc.calcBeginDate($scope));

            var tframe = ChartSvc.formatDateShort($scope);

            $scope.reqParams.startDate = tframe.start;

            $scope.reqParams.endDate = tframe.end;


            var parentDiv = document.getElementById('stockChartDiv');

            try {
                var childSVG = document.getElementById('theSVG');
                parentDiv.removeChild(childSVG);
            }
            catch(error) {}


            HttpSvc.getStockData($scope.reqParams)
                .then(function(dataset) {

                $scope.graphData = dataset.data;
                $scope.reqParams.pair.name = dataset.name;
                createChart();

            }).catch(function(errObj) {

                console.log("ResearchCtrl CATCH:" +
                            "\n\tHTTP: " + errObj.httpStatus +
                            "\n\tQUANDL Code: " + errObj.apiErrCode +
                            "\n\tQUANDL Message: " + errObj.apiErrMsg +
                            "\n\tModal Message: " + errObj.details);

                $scope.errorModalDetails = errObj.details;
                $scope.showErrModal = true;
                spinner.stop();

            }).finally(function() {

                $scope.reqParams.todayDate = new Date();
                $scope.reqParams.howLongAgo = new Date();
                $scope.reqParams.startDate = '';
                $scope.reqParams.endDate = '';
                spinner.stop();

            });
        }// if formValid
    };
}]);
/***********************************************************************************************/






/***********************************************************************************************/
angular.module('UBestInvest').controller('WeatherCtrl',
    ['$scope','HttpSvc', 'SpinnerSvc',
     function($scope, HttpSvc, SpinnerSvc) {

    $(".btn").mouseup(function() {
         $(this).blur();
        console.log("WeatherCtrl: blurring...");
    });

    $scope.weatherParams = {
        forecastType: '/conditions'
    };

    $scope.locations = [
        {displayName: "Atlanta, Georgia", stateCityStr: "GA/Atlanta"},
        {displayName: "Bangor, Maine", stateCityStr: "ME/Bangor"},
        {displayName: "Boston, Massachusetts", stateCityStr: "MA/Boston"},
        {displayName: "Chicago, Illinois", stateCityStr: "IL/Chicago"},
        {displayName: "Dallas, Texas", stateCityStr: "TX/Dallas"},
        {displayName: "Denver, Colorado", stateCityStr: "CO/Denver"},
        {displayName: "Houston, Texas", stateCityStr: "TX/Houston"},
        {displayName: "Las Vegas, Nevada", stateCityStr: "NV/Las_Vegas"},
        {displayName: "Los Angeles, California", stateCityStr: "CA/Los_Angeles"},
        {displayName: "Miami, Florida", stateCityStr: "FL/Miami"},
        {displayName: "New York, New York", stateCityStr: "NY/New_York"},
        {displayName: "Phoenix, Arizona", stateCityStr: "AZ/Phoenix"},
        {displayName: "Raleigh, North Carolina", stateCityStr: "NC/Raleigh"},
        {displayName: "San Francisco, California", stateCityStr: "CA/San_Francisco"},
        {displayName: "Seattle, Washington", stateCityStr: "WA/Seattle"},
        {displayName: "Washington, D.C.", stateCityStr: "DC/Washington"}
    ];

    $scope.weatherParams.selectedLocation = $scope.locations[0];

    $scope.getWeather = function() {

        var spinner = SpinnerSvc.getSpinner();

        HttpSvc.getWeatherData($scope.weatherParams).then(function(result) {

            $scope.weather = result.current_observation;

        }).catch(function(error) {

            console.log("WeatherCtrl - Current Conditions - Catch: " + error);

            spinner.stop();
        });


        // Change parameter for next request to be 3 day forcast
        $scope.weatherParams.forecastType = "/forecast";


        HttpSvc.getWeatherData($scope.weatherParams).then(function(result) {

            $scope.threeForecast = result.forecast.simpleforecast.forecastday;

        }).catch(function(error) {

            console.log("WeatherCtrl - 3 Day Forecast - Catch: " + error);

            spinner.stop();
        });

        //revert back directly after the query has been sent
        $scope.weatherParams.forecastType = "/conditions";

        spinner.stop();

    };// getWeather()
}]);
/***********************************************************************************************/






/***********************************************************************************************/
angular.module('UBestInvest').controller('MarketCtrl', ['$scope', 'ChartSvc', 'HttpSvc', 'SpinnerSvc',
        function($scope, ChartSvc, HttpSvc, SpinnerSvc) {

    $scope.durations = ['1 Week','1 Month','3 Months','6 Months','1 Year','5 Years'];

    $scope.reqParams = {
        todayDate : new Date(),
        howLongAgo: new Date(),
        duration: $scope.durations[1],
        startDate: '',
        endDate: ''
    };

    $scope.reqParams.todayDate.setDate($scope.reqParams.todayDate.getDate() - 1);

    $scope.reqParams.howLongAgo
       .setDate(  ChartSvc.calcBeginDate($scope)  );

    var tframe = ChartSvc.formatDateShort($scope);

    $scope.reqParams.startDate = tframe.start;

    $scope.reqParams.endDate = tframe.end;

    var parentDiv = document.getElementById('mktDiv');

    try { parentDiv.removeChild(document.getElementById('leSVG')); }

    catch(error) {}

    $scope.populateHomeGraphs = function(graphType) {

        var spinner = SpinnerSvc.getSpinner();

        HttpSvc.getHomeGraphData(graphType, $scope.reqParams).then(function(data) {

            $scope.graphData = data;

        }).catch(function(error) {

            console.log("Catch-["+graphType+"]:"+error);
            spinner.stop();

        }).finally(function() {

            $scope.reqParams.todayDate = new Date();
            $scope.reqParams.howLongAgo = new Date();
            $scope.reqParams.startDate = '';
            $scope.reqParams.endDate = '';

            spinner.stop();
        });
    }

}]);
