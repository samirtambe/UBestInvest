(function(){

    angular.module('Sapp')
    .controller('StockListController',
                ['$scope', 'StockListService','$window',
                 function($scope, StockListService,$window) {

        var ctr,
            len,
            opt,
            datalist = document.getElementById('investData');

        $scope.myStocks = ['T','MO','VZ','PRGO','BMY','AOS','AGN'];

        for (ctr = 0, len = $scope.myStocks.length; ctr < len; ctr++) {
            opt = document.createElement('option')
            opt.value = $scope.myStocks[ctr];
            datalist.appendChild(opt);
        }

        $scope.graphData = StockListService.query();

        $scope.graphData.$promise.then(function (result) {

            console.log('Setting $scope with retreived graph data');

            $scope.graphData = result.data;

            console.log("Drawing Chart...");
//=======================================================================
//        var margin = {top: 10, right: 10, bottom: 10, left: 10},
//            width = 460 - margin.left - margin.right,
//            height = 250 - margin.top - margin.bottom;

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        //var parseDate = d3.time.format("%d-%b-%y");
        var parseDate = d3.time.format("%Y-%m-%d").parse;
        var x = d3.time.scale().range([0, width]);

        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom");

        var yAxis = d3.svg.axis().scale(y).orient("left");

        var area = d3.svg.area()
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.close); });

        var svg = d3.select("#stockChartDiv").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var data = [];
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

//====================================================================================
        });

        console.log("StockListController Created");
    }])

    .controller('WeatherController',
                ['$scope', 'WeatherService', function($scope, WeatherService) {

        $scope.weather = WeatherService.query();

        console.log("WeatherController Created");

    }]);
}()); // IFFE
