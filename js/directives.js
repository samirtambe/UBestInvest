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


angular.module('UBestInvest').directive('newsBox', [function() {
    return {

        templateUrl: 'views/newsBox.html',

        restrict: 'E',

        controller: 'NewsBoxCtrl',

        scope: {
            newstype: '='
        },

        link: function (scope, element, attrs) {

            switch(attrs.newstype) {

                case 'newsNational':
                    scope.populateNewsBox('newsNational');
                    break;
                case 'newsWorld':
                    scope.populateNewsBox('newsWorld');
                    break;
                case 'newsBusiness':
                    scope.populateNewsBox('newsBusiness');
                    break;
                case 'newsRealEstate':
                    scope.populateNewsBox('newsRealEstate');
                    break;
                case 'newsTech':
                    scope.populateNewsBox('newsTech');
                    break;
                case 'newsSports':
                    scope.populateNewsBox('newsSports');
                    break;
            }
        }
    };
}]);


angular.module('UBestInvest').directive('resize', ['$window',function($window) {
    return {
        link: function(scope) {

            var timeout=false, delay=650;

            function onResize(e) {

                clearTimeout(timeout);

                timeout = setTimeout(sendBroadcast, delay);

                function sendBroadcast() {

                    scope.$broadcast('resize::resize');
                }
            }

            function cleanUp() {
                console.log('cleanup called...');
                angular.element($window).off('resize', onResize);
            }

            angular.element($window).on('resize', onResize);

            scope.$on('$destroy', cleanUp);
        }
    }
}]);
/* -in index.html or finance.html put 'resize' broadcaster
   -in finance.html put 'elastic-div' attribute
*/
angular.module('UBestInvest').directive('elasticDiv', [function() {
    return {
        restrict: 'A',
        //template: '<div></div>',
        link: function(scope, element) {
            scope.$on('resize::resize', function() {
                console.log('Receiving broadcast signal...');
/* ************************************ */
            var parentDiv = document.getElementById('stockChartDiv');

            try {
                var childSVG = document.getElementById('theSVG');

                parentDiv.removeChild(childSVG);

                GraphSvc.createGraph('stocks', scope.graphData);
            }
            catch(error) {}

/* ************************************ */
            });
        }
    };
}]);
