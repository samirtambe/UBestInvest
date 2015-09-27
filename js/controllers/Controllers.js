angular.module('TambeTech').controller('StockViewCtrl', ['$scope', 'HttpSvc', '$window', function($scope, HttpSvc, $window) {

    $scope.investments = [
        {invName: 'Altria Group', invSymbol: 'MO'},
        {invName: 'Apple Computers', invSymbol: 'AAPL'},
        {invName: 'Bank of America', invSymbol: 'BAC'},
        {invName: 'Google', invSymbol: 'GOOG'},
        {invName: 'Perrigo', invSymbol: 'PRGO'},
        {invName: 'Microsoft', invSymbol: 'MSFT'},
    ];

    $scope.durations = ['1 Week','1 Month','3 Months','6 Months','1 Year','5 Years'];

    $scope.reqParams = {
        reqType: 'stock',
        symbol : $scope.stockSymbol,
        investment : $scope.investments[0],
        todayDate : new Date(),
        howLongAgo: new Date(), // just a dummy value, we need it to be a date object
        duration: $scope.durations[0],
        startDate: '',
        endDate: ''
    };


    $scope.reqParams.todayDate.setDate($scope.reqParams.todayDate.getDate() - 1);


    var padWithZero = function (chk) {

        if (chk.length == 1) { return ('0' + chk); }

        else { return chk;  }

    },
        createChart = function() {

            var margin = {top: 20,  right: 20,  bottom: 30,  left: 50 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom,

            parseDate = d3.time.format("%Y-%m-%d").parse,

            x = d3.time.scale().range([0, width]),

            y = d3.scale.linear().range([height, 0]),

            xAxis = d3.svg.axis().scale(x).orient("bottom"),

            yAxis = d3.svg.axis().scale(y).orient("left"),

            area = d3.svg.area()
                .x(function(d) { return x(d.date); })
                .y0(height)
                .y1(function(d) { return y(d.close); }),

            svg = d3.select("#stockChartDiv").append("svg")
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
            //console.log('Data Elements = ' + data.length);

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
              .call(xAxis);

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
                .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("U.S. Dollars");
        },

    setBeginDate = function() {

        var dur = $scope.durations;

        switch($scope.reqParams.duration) {

            case dur[0]:
                $scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate()-7);
                break;

            case dur[1]:
                $scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate()-31);
                break;

            case dur[2]:
                $scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate() - 93);
                break;

            case dur[3]:
                $scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate()-186);
                break;

            case dur[4]:
                $scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate()-366);
                break;

            case dur[5]:
                $scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate()-1827);
                break;

            default:
                $scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate()-7);
        }

    },
    formatDateShort = function() {

        $scope.reqParams.startDate = $scope.reqParams.todayDate.getFullYear() +
            '-' +
            padWithZero(($scope.reqParams.todayDate.getMonth() + 1).toString()) +
            '-' +
            padWithZero($scope.reqParams.todayDate.getDate().toString());

        $scope.reqParams.endDate = $scope.reqParams.howLongAgo.getFullYear() +
            '-' +
            padWithZero(($scope.reqParams.howLongAgo.getMonth() + 1).toString()) +
            '-' +
            padWithZero($scope.reqParams.howLongAgo.getDate().toString());
    };

    $scope.getGraph = function() {

        setBeginDate();

        formatDateShort();

        var parentDiv = document.getElementById('stockChartDiv');

        try {
            var childSVG = document.getElementById('theSVG');
            parentDiv.removeChild(childSVG);
        }
        catch(error) {
            console.log("No SVG element. Ok.");
        }


        HttpSvc.getData($scope.reqParams)
            .then(function(data) {

            $scope.graphData = data;
            createChart();

        }).catch(function(error) {

            console.log("StockListCtrl - Catch: " + error);

        }).finally(function() {

            $scope.reqParams.todayDate = new Date();
            $scope.reqParams.howLongAgo = new Date();
            $scope.reqParams.startDate = '';
            $scope.reqParams.endDate = '';

        });
    };
}]);
/***********************************************************************************************/






/***********************************************************************************************/
angular.module('TambeTech').controller('WeatherCtrl',['$scope','HttpSvc',function($scope, HttpSvc) {

    $scope.weatherParams = {
        forecastType: '/conditions',
        reqType: 'weather'
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

        HttpSvc.getData($scope.weatherParams).then(function(result) {
            $scope.weather = result.current_observation;
        }).catch(function(error) {
            console.log("WeatherCtrl - Current Conditions - Catch: " + error);
        });


        // Change parameter for next request to be 3 day forcast
        $scope.weatherParams.forecastType = "/forecast";


        HttpSvc.getData($scope.weatherParams).then(function(result) {
            $scope.threeForecast = result.forecast.simpleforecast.forecastday;
        }).catch(function(error) {
            console.log("WeatherCtrl - 3 Day Forecast - Catch: " + error);
        });

        //revert back directly after the query has been sent
        $scope.weatherParams.forecastType = "/conditions";

    };// getWeather()
}]);
/***********************************************************************************************/






/***********************************************************************************************/
angular.module('TambeTech').controller('HomeCtrl',['$scope', 'HttpSvc', '$window', function($scope, HttpSvc, $window) {

}]);
