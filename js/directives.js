angular.module('UBestInvest').directive('stockGraph',['GraphSvc', function(GraphSvc) {

   return {
       restrict: 'E',

       scope: {

           graphtype: '@'
       },

       template: '<div class="frontChartDiv"></div>',

       controller: 'MarketCtrl',

       link: function(scope, elem, attrs) {

           var grData = [];

           if (attrs.graphtype == 'dowjones') { scope.populateNewsGraphs('dowjones');}
           else if (attrs.graphtype == 'nasdaq') { scope.populateNewsGraphs('nasdaq'); }
           else if (attrs.graphtype == 'sp500') { scope.populateNewsGraphs('sp500'); }

           // Remember watch does not go very deep it only checks reference
           // 'graphData' refers to $scope.graphData in the MarketCtrl
           scope.$watch('graphData', function(newVal) {

               if (newVal) {

                   grData = newVal;

                   GraphSvc.createGraph(attrs.graphtype, grData);
               }//IF
           });//WATCH
       }//link function
   };//RETURN
}]);




/*************************************************************************************/




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
