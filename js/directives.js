angular.module('UBestInvest').directive('stockGraph', [function() {

   return {
       restrict: 'E',
       scope: {
           ctype: '@'
       },
       template: '<div class="frontChartDiv"></div>',
       controller: 'MarketCtrl',
       link: function(scope, elem, attrs) {

           var drawChart = function() {

               var chrtDivs = document.getElementsByClassName('frontChartDiv');

               var aChartDiv = '';

               if (attrs.ctype == 'dowjones') {
                   aChartDiv = chrtDivs[0];
                   aChartDiv.id = 'frontMktDowJonesDiv';
               }
               else if(attrs.ctype == 'sp500') {
                   aChartDiv = chrtDivs[1];
                   aChartDiv.id = 'frontMktSP500Div';
               }

               var wide = aChartDiv.scrollWidth,

                   tall = aChartDiv.scrollHeight,

                   margin = {top: 10, right: 10, bottom: 30, left: 55},

                   width = 420 - margin.left - margin.right,

                   height = 220 - margin.top - margin.bottom,

                   parseDate = d3.time.format("%Y-%m-%d").parse,

                   // create x-axis scale
                   x = d3.time.scale().range([0, width]),

                   // create y-axis scale
                   y = d3.scale.linear().range([height, 0]),

                   // orient x-axis
                   xAxis = d3.svg.axis().scale(x).orient("bottom"),

                   // orient y-axis
                   yAxis = d3.svg.axis().scale(y).orient("left"),

                   area = d3.svg.area().x(function(d) {
                       return x(d.date);

                   }).y0(height).y1(function(d) {
                       return y(d.close);
                   }),

                   svg = d3.select('#'+aChartDiv.id)
                            .append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                   var data = [];

        // CONVERT AN LONG ARRAY OF ARRAYS into an array of objects

                   for (var cat = 0; cat < grData.length; cat++) {
                            data.unshift(
                                {
                                    date: grData[cat][0],//$scope.graphData[cat][0],
                                    close: grData[cat][1] //$scope.graphData[cat][1]
                                }
                            );
                        }

                   data.forEach(function(pair) {
                       pair.date = parseDate(pair.date);
                       pair.close = +pair.close;
                   });

                   x.domain(d3.extent(data, function(d) { return d.date; } ) );

                   y.domain([0, d3.max(data, function(d) { return d.close; } ) ] );

                   svg.append("path").datum(data).attr("class", "area").attr("d", area);

                   // Drawing x-axis
                   svg.append("g").attr("class","x axis").attr("transform","translate(0,"+height+")")
                       .call(xAxis);

                   // Drawing y-axis
                   svg.append("g").attr("class", "y axis").call(yAxis).append("text")
                       .attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em")
                       .style("text-anchor", "end").text("U.S. Dollars");

           };//drawChart

           var grData = [];

           if (attrs.ctype == 'dowjones') {
               scope.populateDowJones();
           }
           else if(attrs.ctype == 'sp500') {
               scope.populateSP500();
           }



           // Remember watch does not go very deep it only checks reference
           // 'graphData' refers to $scope.graphData in the MarketCtrl
           scope.$watch('graphData', function(newVal) {
               if (newVal) {
                   grData = newVal;
                   drawChart();
               }
           });
       }// LINK FUNCTION
   };// RETURN
}]);
/*********************************************************************************************/






/*********************************************************************************************/
angular.module('UBestInvest').directive('errorModal', [function() {
    return {
        templateUrl: 'views/invErrModal.html',
        restrict: 'E',
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {

            scope.$watch(attrs.visible, function(value) {

                if(value == true) { $(element).modal('show'); }
                else { $(element).modal('hide'); }
            });

            $(element).on('shown.bs.modal', function() {

                scope.$apply(function() {

                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
}]);
