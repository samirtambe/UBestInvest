(function(){

    angular.module('Sapp')
        .controller('StockListController', [
        '$scope', 'StockListService', '$window',
        function($scope, StockListService, $window) {


        var padWithZero = function (chk) {

            if (chk.length == 1) { return ('0' + chk); }
            else { return chk;  }
        };


        $scope.reqParams = {
            symbol : $scope.stockSymbol,
            todayDate : new Date(),
            howLongAgo: new Date(), // just a dummy value, we need it to be a date object
            duration: '1 Week',
            startDate: '',
            endDate: ''
        };

        $scope.durations = ['1 Week',
                            '1 Month',
                            '3 Months',
                            '6 Months',
                            '1 Year'];

        $scope.debugParams = function() {
            //console.log($scope.reqParams);
            console.log('.');
        };


        $scope.reqParams = {
            symbol : $scope.stockSymbol,
            todayDate : new Date(),
            howLongAgo: new Date(), // just a dummy value, we need it to be a date object
            duration: '1 Week',
            startDate: '',
            endDate: ''
        };


        $scope.getGraph = function() {

            switch($scope.reqParams.duration) {

                case '1 Week':
$scope.reqParams.todayDate.setDate($scope.reqParams.todayDate.getDate() - 3); // yesterdate
$scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate() - 7);
                    break;

                case '1 Month':
$scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate() - 31);
                    break;

                case '3 Months':
$scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate() - 93);
                    break;

                case '6 Months':
$scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate() - 186);
                    break;

                case '1 Year':
$scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate() - 366);
                    break;

                default:
$scope.reqParams.howLongAgo.setDate($scope.reqParams.todayDate.getDate() - 7);

            }

//converting dates to a short form string
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



            var parentDiv = document.getElementById('stockChartDiv');


            try {
                var childSVG = document.getElementById('theSVG');
                parentDiv.removeChild(childSVG);
            }
            catch(error) {
                console.log("There is no SVG element to delete...OK");
            }

            $scope.graphData = StockListService($scope.reqParams).query();


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
                console.log('Data Elements = ' + data.length);

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

            })

            .catch(function(error) {

                console.error('!!! - '+error);
                alert ($scope.stockSymbol + " is causing problems!");
                $scope.stockSymbol = "";

            }).finally(function() {

                $scope.reqParams.todayDate = new Date();
                $scope.reqParams.howLongAgo = new Date();
                $scope.reqParams.startDate = '';
                $scope.reqParams.endDate = '';

            });// PROMISE

        }; // getGraph function()


        console.log("StockListController");
    }])

    .controller('WeatherController',
                ['$scope', 'WeatherService', function($scope, WeatherService) {

        $scope.weather = WeatherService.query();

        console.log("WeatherController");

    }]);
}()); // IFFE
