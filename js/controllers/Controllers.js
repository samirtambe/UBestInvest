(function(){

    angular.module('Sapp')
        .controller('StockListController', [
        '$scope', 'StockListService', '$window',
        function($scope, StockListService, $window) {

        $scope.durations = ['1 Week', '1 Month', '3 Months', '6 Months', '1 Year'];

        $scope.chosen = { timeframe: '1 Week' } ;

        $scope.changeTimeframe = function() { console.log($scope.chosen.timeframe); };

        $scope.getGraph = function() {

            switch($scope.chosen.timeframe) {
                case '1 Week':

                    break;
                case '1 Month':

                    break;
                case '3 Months':

                    break;
                case '6 Months':

                    break;
                case '1 Year':

                    break;
            }

            var parentDiv = document.getElementById('stockChartDiv');

            try {
                var childSVG = document.getElementById('theSVG');
                parentDiv.removeChild(childSVG);
            }
            catch(error) {
                console.log("The element with id = theSVG does not exist.");
            }

            $scope.graphData = StockListService($scope.stockSymbol).query();


            $scope.graphData.$promise.then(function (result) {

                console.log('Setting $scope with retreived graph data');

                $scope.graphData = result.data;

                console.log("Drawing Chart...");


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
                console.log('Length of array of objects = ' + data.length);

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
                  .text("Price (USD)");

            })

            .catch(function(error) {

                console.error('!!! - '+error);
                alert ($scope.stockSymbol + " is causing problems!");
                $scope.stockSymbol = "";
            });// PROMISE CATCH CLAUSE

        }; // getGraph function()

        console.log("StockListController");
    }])

    .controller('WeatherController',
                ['$scope', 'WeatherService', function($scope, WeatherService) {

        $scope.weather = WeatherService.query();

        console.log("WeatherController");

    }]);
}()); // IFFE
