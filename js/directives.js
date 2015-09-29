angular.module('TambeTech').directive('stockGraph', ['$parse', '$window', function($parse, $window) {

   return {
       restrict: 'E',
       template: "<svg id='leSVG' width='400' height='200'></svg>",
       controller: 'MarketCtrl',
       link: function(scope, elem, attrs) {

console.log('Directive scope > ' + scope.graphData);

           var exp = $parse(attrs.chartData),

           grData = exp(scope),

           padding = 20,

           pathClass = "path",

           xScale, yScale, xAxisGen, yAxisGen, lineFun,

           d3 = $window.d3,

           rawSvg = elem.find('svg'),

           svg = d3.select(rawSvg[0]);

console.log('Directive grData > ' + scope.graphData);

//           scope.$watchCollection(exp, function(newVal, oldVal){
//               grData=newVal;
//               redrawLineChart();
//           });

           function setChartParameters(){

               xScale = d3.scale.linear()
                   .domain([grData[0].date, grData[grData.length-1].date])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.linear()
                   .domain([0, d3.max(grData, function (d) {
                       return d.sales;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(grData.length - 1);

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               lineFun = d3.svg.line()
                   .x(function (d) {
                       return xScale(d.hour);
                   })
                   .y(function (d) {
                       return yScale(d.sales);
                   })
                   .interpolate("basis");
           }

         function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(grData),
                       "stroke": "blue",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           function redrawLineChart() {

               setChartParameters();

               svg.selectAll("g.y.axis").call(yAxisGen);

               svg.selectAll("g.x.axis").call(xAxisGen);

               svg.selectAll("."+pathClass)
                   .attr({
                       d: lineFun(grData)
                   });
           }

           drawLineChart();
       }
   };
}]);
//parseDate = d3.time.format("%Y-%m-%d").parse;
